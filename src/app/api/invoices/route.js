import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

function generateRandomLetters(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


const getPaymentDueDate = (date, terms) => {
  // get invoiceData.payment_terms, split "Net 30 days" and grab 30, convert to integer, add to invoiceData.invoice_date
  // convert to data using convertDate()
  const paymentTermsNum = parseInt(terms.split(' ')[1])
  const invoiceDate = new Date(date)
  console.log(invoiceDate, paymentTermsNum)
  invoiceDate.setDate(invoiceDate.getDate() + paymentTermsNum)
  return new Date(invoiceDate)
}

export async function GET(req) {

  // map nextUrl and create select: {item: true} object
  const type = req.nextUrl.searchParams.get('type')
  let invoices

  if (type === 'ids') {
    // get invoices based
    invoices = await prisma.invoices.findMany({
      select: {
        id: true
      }
    })
    return Response.json({
      status: '201',
      body: {
        invoices: invoices
      }
    })
  } else if (type === 'invoice-table') {
    // Create an array to hold status filters
    const statusFilters = [];
    for (let i = 1; i <= 3; i++) {
      const status = req.nextUrl.searchParams.get(`status${i}`);
      if (status) {
        statusFilters.push(status);
      }
    }

    // Build the query conditionally based on status filters
    const whereCondition = statusFilters.length > 0 ? {
      status: {
        in: statusFilters, // Filters the invoices by the specified statuses
      }
    } : {};

    // from invoices get custom_id, invoice_date, total, status and billto.client_name
    invoices = await prisma.invoices.findMany({
      where: whereCondition,
      select: {
        custom_id: true,
        due_date: true,
        total: true,
        status: true,
        billto: {
          select: {
            client_name: true
          }
        }
      },
      orderBy: {
        due_date: 'asc'
      }
    });
    let newInvoices = []

    invoices.forEach((invoice) => {
      // convert 2023-11-09T00:00:00.000Z to 09 Nov 2023
      const date = new Date(invoice.due_date)
      const options = {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'}
      const formattedDate = date.toLocaleDateString('en-GB', options)

      newInvoices.push({
        id: invoice.custom_id,
        due_date: formattedDate,
        clientName: invoice.billto[0].client_name,
        total: invoice.total,
        status: invoice.status
      })
    })

    return Response.json({
      status: '201',
      body: {
        invoices: newInvoices
      }
    })
  } else if (type === 'summary') {
    const custom_id = req.nextUrl.searchParams.get('id')
    const invoice = await prisma.invoices.findUnique({
      where: {
        custom_id: custom_id
      },
      include: {
        billfrom: true,
        billto: true,
        itemlist: true,

      }
    })

    return Response.json({
      status: '201',
      body: {
        invoice: invoice,
        custom_id: custom_id
      }
    })
  }
}

export async function POST(req) {
  // get body from request
  const body = await req.json()

  // check if creating or updating invoice
  const type = body.invoice_details.type

  // Create invoice
  if (type === 'create') {
    // create invoices, then billfrom, billto, itemlist:(item_name, quantity, price) map
    try {
      const invoice_id = await prisma.invoices.create({
        data: {
          custom_id: body.invoice_details.custom_id,
          invoice_date: body.invoice_details.invoice_date,
          due_date: body.invoice_details.due_date,
          payment_terms: body.invoice_details.payment_terms,
          project_description: body.invoice_details.project_description,
          status: body.invoice_details.status,
          total: body.invoice_details.total,
        }
      })

      // create billfrom
      await prisma.billfrom.create({
        data: {
          address: body.bill_from.street_address,
          city: body.bill_from.city,
          post_code: body.bill_from.post_code,
          country: body.bill_from.country,
          invoice_id: invoice_id.id
        }
      })

      // create billto
      await prisma.billto.create({
        data: {
          client_name: body.bill_to.client_name,
          client_email: body.bill_to.client_email,
          address: body.bill_to.street_address,
          city: body.bill_to.city,
          post_code: body.bill_to.post_code,
          country: body.bill_to.country,
          invoice_id: invoice_id.id
        }
      })

      // create itemlist
      await prisma.itemlist.createMany({
        data: body.item_list.map((item) => {
          return {
            item_name: item.name,
            quantity: parseInt(item.quantity),
            price: parseFloat(item.price),
            invoice_id: invoice_id.id
          }
        })
      })

      return Response.json({
        status: '201',
        body: {
          message: 'Invoice created',
        }
      })

    } catch (e) {
      return Response.json({
        status: '400',
        body: {
          message: e.message
        }
      })
    }
}

else
if (type === 'update') {

}

}

// delete invoice by id parameter
export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get('id')
  await prisma.invoices.delete({
    where: {
      custom_id: id
    }
  })
  return Response.json({
    status: '201',
    body: {
      message: `Invoice ${id} deleted`,
      id: id
    }
  })
}

export async function PUT(req) {
  const type = req.nextUrl.searchParams.get('type')


  if (type === 'status') {
    const id = req.nextUrl.searchParams.get('id')
    await prisma.invoices.update({
      where: {
        custom_id: id
      },
      data: {
        status: 'paid'
      }
    })
    return Response.json({
      status: '201',
      body: {
        message: `Invoice ${id} status updated to paid`,
        id: id,
        status: 'status'
      }
    })
  } else {
    const body = await req.json()
    const invoiceData = body.invoiceData
    const invoiceDate = new Date(body.invoiceData.invoiceDetails.invoiceDate)
    let total = 0;
    await prisma.invoices.update({
      where: {
        id: invoiceData.invoiceDetails.id
      },
      data: {
        /* billfrom table*/
        billfrom: {
          update: {
            where: {
              id: invoiceData.billFrom.id
            },
            data: {
              address: invoiceData.billFrom.address,
              city: invoiceData.billFrom.city,
              post_code: invoiceData.billFrom.post_code,
              country: invoiceData.billFrom.country,
            }

          }
        },
        /* billto table*/
        billto: {
          update: {
            where: {
              id: invoiceData.billTo.id
            },
            data: {
              client_name: invoiceData.billTo.clientName,
              client_email: invoiceData.billTo.clientEmail,
              address: invoiceData.billTo.address,
              city: invoiceData.billTo.city,
              post_code: invoiceData.billTo.post_code,
              country: invoiceData.billTo.country,
            }
          }
        },

        itemlist: {
          updateMany: invoiceData.itemList.map((item) => {
            total += parseFloat(item.price) * parseInt(item.quantity)
            return {
              where: {
                id: item.id
              },
              data: {
                item_name: item.item_name,
                quantity: parseInt(item.quantity),
                price: parseInt(item.price),
              }
            }
          })
        },
        invoice_date: invoiceDate,
        payment_terms: invoiceData.invoiceDetails.paymentTerms,
        project_description: invoiceData.invoiceDetails.projectDescription,
        total: total,
      }
    })

    return Response.json({
      status: '201',
      body: {
        message: 'Invoice updated',
        invoiceData: {
          custom_id: invoiceData.invoiceDetails.custom_id,
          invoice_date: invoiceData.invoiceDetails.invoiceDate,
          payment_terms: invoiceData.invoiceDetails.paymentTerms,
          project_description: invoiceData.invoiceDetails.projectDescription,
          status: invoiceData.invoiceDetails.status,
          id: invoiceData.invoiceDetails.id,
          total: total,
          billfrom: [{
            address: invoiceData.billFrom.address,
            city: invoiceData.billFrom.city,
            post_code: invoiceData.billFrom.post_code,
            country: invoiceData.billFrom.country,
            id: invoiceData.billFrom.id,
          }],
          billto: [{
            client_name: invoiceData.billTo.clientName,
            client_email: invoiceData.billTo.clientEmail,
            address: invoiceData.billTo.address,
            city: invoiceData.billTo.city,
            post_code: invoiceData.billTo.post_code,
            country: invoiceData.billTo.country,
            id: invoiceData.billTo.id,
          }],
          itemlist: invoiceData.itemList.map((item) => {
            return {
              id: item.id,
              item_name: item.item_name,
              quantity: parseInt(item.quantity),
              price: parseFloat(item.price),
            }
          }),
        }
      }
    })


  }
}
