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

export async function GET(req) {
  // get all invoice ids invoices
  const invoices = await prisma.invoices.findMany({
    select: {
      id: true
    }
  })

  return Response.json({
    status: '201',
    body: {
      ids: invoices
    }
  })

}

export async function POST(req) {


  // get body from request
  const body = await req.json()

  // convert body.invoiceData.invoiceDetails.invoiceDate to Date object
  // body.invoiceData.invoiceDetails.invoiceDate is like "02 Aug 2021"
  // we need to convert it to Date object so that we can store it in postgresql
  const invoiceDate = new Date(body.invoiceData.invoiceDetails.invoiceDate)

  const invoice = await prisma.invoices.create({
    data: {
      invoice_date: invoiceDate,
      payment_terms: body.invoiceData.invoiceDetails.paymentTerms,
      project_description: body.invoiceData.invoiceDetails.projectDescription,
    }
  })

  // generate a unique id:
  // #[random capital letter][random capital letter][random number][random number][random number][random number]
  // example: #RT3080
  // loop 20 times: check if unique id already exists in database invoices custom_id column
  // if it does, generate another unique id
  // if it doesn't, use the unique id generated loop
  let customInvoiceID = null;
  for (let i = 0; i < 20; i++) {
    customInvoiceID = `#${generateRandomLetters(2)}${Math.floor(1000 + Math.random() * 9000)}`;
    const existingInvoice = await prisma.invoices.findUnique({
      where: {
        custom_id: customInvoiceID
      },
    })
    if (existingInvoice === null) {
      // put customInvoiceID in database invoices[invoice.id].custom_id
      const updatedInvoice = await prisma.invoices.update({
        where: {
          id: invoice.id
        },
        data: {
          custom_id: customInvoiceID
        }
      })
      break;
    }
  }

  const billFrom = await prisma.billfrom.create({
    data: {
      invoice_id: invoice.id,
      address: body.invoiceData.billFrom.address,
      city: body.invoiceData.billFrom.city,
      post_code: body.invoiceData.billFrom.postCode,
      country: body.invoiceData.billFrom.country,
    }
  })

  const billTo = await prisma.billto.create({
    data: {
      invoice_id: invoice.id,
      client_name: body.invoiceData.billTo.clientName,
      client_email: body.invoiceData.billTo.clientEmail,
      address: body.invoiceData.billTo.address,
      city: body.invoiceData.billTo.city,
      post_code: body.invoiceData.billTo.postCode,
      country: body.invoiceData.billTo.country,
    }
  })

  // if invoiceID is still null, then we have looped 20 times and still haven't found a unique id
  // return error
  if (customInvoiceID === null) {
    return Response.json({
      status: '500',
      body: {
        error: 'Unable to generate unique id'
      }
    })
  }

  // map body.itemList and create new item in Items table in postgresql
  const items = body.invoiceData.itemList.map(async (item) => {
    const newItem = await prisma.itemlist.create({
      data: {
        invoice_id: invoice.id,
        item_name: item.name,
        //convert item.quantity to integer
        quantity: parseInt(item.quantity),
        //convert item.price to integer
        price: parseInt(item.price),
      }
    })
  })


  return Response.json({
    status: '201',
    body: {
      key: JSON.stringify(body)
    }
  })


}
