import {PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()


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


  const billFrom = await prisma.billfrom.create({
    data: {
      address: body.invoiceData.billFrom.address,
      city: body.invoiceData.billFrom.city,
      post_code: body.invoiceData.billFrom.postCode,
      country: body.invoiceData.billFrom.country,
    }
  })

  const billTo = await prisma.billto.create({
    data: {
      client_name: body.invoiceData.billTo.clientName,
      client_email: body.invoiceData.billTo.clientEmail,
      address: body.invoiceData.billTo.address,
      city: body.invoiceData.billTo.city,
      post_code: body.invoiceData.billTo.postCode,
      country: body.invoiceData.billTo.country,
    }
  })

  const invoice = await prisma.invoices.create({
    data: {
      bill_from_id: billFrom.id,
      bill_to_id: billTo.id,
      invoice_date: invoiceDate,
      payment_terms: body.invoiceData.invoiceDetails.paymentTerms,
      project_description: body.invoiceData.invoiceDetails.projectDescription,
    }
  })

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
