"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/@/components/ui/button";


export default function Page({params}) {
  const {id} = params
  const type = 'summary'
  const [invoiceData, setInvoiceData] = useState({})
  const statusColor = {
    draft: '#373B53',
    pending: '#FF8F00',
    paid: '#33D69F'
  }

  function getStatusClasses(status) {
    let baseClasses = "w-[6rem] h-[2.75rem] flex flex-row rounded-[0.375rem] mr-[1.25rem] justify-center items-center heading-s-v capitalize bg-opacity-[6%]";
    switch (status) {
      case 'draft':
        return `${baseClasses} bg-[#373B53] text-[#373B53]`;
      case 'pending':
        return `${baseClasses} bg-[#FF8F00] text-[#FF8F00]`;
      case 'paid':
        return `${baseClasses} bg-[#33D69F] text-[#33D69F]`;
      default:
        return baseClasses; // default classes
    }
  }

  const convertDate = (date) => {
    //convert 2023-11-09T00:00:00.000Z to Nov 9 2023
    const dateObj = new Date(date)
    const month = dateObj.toLocaleString('default', {month: 'short'})
    const day = dateObj.getDate()
    const year = dateObj.getFullYear()
    return `${month} ${day} ${year}`
  }

  const getPaymentDueDate = (date) => {
    // get invoiceData.payment_terms, split "Net 30 days" and grab 30, convert to integer, add to invoiceData.invoice_date
    // convert to data using convertDate()
    const paymentTerms = invoiceData.payment_terms
    const paymentTermsNum = parseInt(paymentTerms.split(' ')[1])
    const invoiceDate = new Date(invoiceData.invoice_date)
    const paymentDueDate = invoiceDate.setDate(invoiceDate.getDate() + paymentTermsNum)
    return convertDate(paymentDueDate)
  }

  const convertToCurrency = (num) => {
    //convert num to float
    num = parseFloat(num)
    // Ensure the input is a number
    if (typeof num !== 'number') {
      console.error("Input must be a number.");
      return null;
    }

    // Convert number to a string in currency format
    return num.toLocaleString('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  const getInvoiceTotal = (qty, total) => {
    return convertToCurrency(parseFloat(qty) * parseFloat(total))

  }

  useEffect(() => {
    console.log(id)
    fetch(`/api/invoices?type=${type}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        console.log(invoiceData.itemlist)
        setInvoiceData(data.body.invoice)
      })
  }, []);

  return (
    <>
      {invoiceData.id ?
        (
          <>
            <div className="page_container pr-[22.1875rem] pl-[15.75rem] pt-[4.0625rem] bg-11-light min-h-screen">
              <div className="back_group flex flex-row items-center h-[1rem] gap-[1.5rem]
      heading-s-v text-8-text mb-[2rem]">
                <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none"
                        fillRule="evenodd"/>
                </svg>
                <p>Go back</p>
              </div>
              <div
                className="status_button-container flex flex-row justify-between w-full bg-white h-[5.5rem] mb-[1.5rem] px-8 py-6 rounded-[0.5rem]">
                <div className="status-group flex flex-row items-center h-full gap-5 body-v text-[#858BB2]">
                  <p>Status</p>
                  <div
                    className={`status-button flex flex-row justify-center items-center w-[6.5rem] h-[2.75rem] rounded-[0.375rem] mr-[1.25rem] heading-s-v capitalize bg-opacity-[6%]
            ${getStatusClasses(invoiceData.status)}`}>
                    <li>{invoiceData.status}</li>
                  </div>
                </div>
                <div className="button-group flex flex-row gap-2">
                  <Button
                    className="px-6 py-[1.125rem] rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v">Edit</Button>
                  <Button
                    className="px-6 py-[1.125rem] rounded-[1.5rem] bg-9-accent text-white heading-s-v">Delete</Button>
                  <Button className="px-6 py-[1.125rem] rounded-[1.5rem] bg-1-primary text-white heading-s-v">Mark as
                    Paid</Button>
                </div>
              </div>

              <div className="invoice_summary-container flex flex-col bg-white h-fit px-12 py-12 gap-4 w-full rounded-[0.5rem]">
                <div className="invoice_summary-header-group flex flex-row justify-between ">
                  <div className="summary_header gap-2 flex flex-col">
                    <h1 className="heading-s text-6-muted">#<span className="text-8-text">{invoiceData.custom_id}</span>
                    </h1>
                    <p className=" body text-7-info uppercase ">{invoiceData.project_description}</p>
                  </div>
                  <div className="summary_billfrom-group body text-7-info">
                    <p className="capitalize">{invoiceData.billfrom[0].address}</p>
                    <p className="capitalize">{invoiceData.billfrom[0].city}</p>
                    <p>{invoiceData.billfrom[0].post_code}</p>
                    <p className="capitalize">{invoiceData.billfrom[0].country}</p>
                  </div>
                </div>

                <div className="invoice_summary-billto-group flex flex-row ">
                  <div className="invoice_payment-group flex flex-col gap-8 mr-[9.375rem]">
                    <div className="invoice_date-group">
                      <p className="payment_due_text text-7-info body-v mb-3">Invoice Date</p>
                      <p className="payment_due_date heading-s text-8-text">{convertDate(invoiceData.invoice_date)}</p>
                    </div>
                    <div className="invoice_due_date-group">
                      <p className="payment_due_text text-7-info body-v mb-3">Payment Due</p>
                      <p
                        className="payment_due_date heading-s text-8-text">{getPaymentDueDate(invoiceData.invoice_date)}</p>
                    </div>
                  </div>

                  <div className="invoice_billto-group flex flex-col mr-[7rem]">
                    <h2 className="body-v text-7-info mb-3">Bill To</h2>
                    <p className="heading-s capitalize mb-2">{invoiceData.billto[0].client_name}</p>
                    <p className="body text-7-info capitalize">{invoiceData.billto[0].address}</p>
                    <p className="body text-7-info capitalize">{invoiceData.billto[0].city}</p>
                    <p className="body text-7-info capitalize">{invoiceData.billto[0].post_code}</p>
                    <p className="body text-7-info capitalize">{invoiceData.billto[0].country}</p>
                  </div>

                  <div className="client_email-group flex flex-col">
                    <p className="body-v text-7-info mb-3">Sent to</p>
                    <p className="heading-s capitalize ">{invoiceData.billto[0].client_email}</p>
                  </div>
                </div>

                <div className="invoice_summary-item-group w-full h-fit  bg-[#F9FAFE] ">
                  <div className="bg-[#F9FAFE] p-8 rounded-t-[0.5rem] rounded-[0.5rem]">
                    <div className="item_table-header-group flex flex-row justify-between mb-6 ">
                      <div className="item_table-header flex flex-row w-full">
                        <p className="body text-6-muted w-[17rem]">Item Name</p>
                        <p className="body text-6-muted w-16 text-center">QTY.</p>
                        <p className="body text-6-muted w-[6rem] text-right">Price</p>
                        <p className="body text-6-muted flex-grow text-right">Total</p>
                      </div>
                    </div>
                    <div className="item_table-body-group flex flex-col gap-4">
                      {invoiceData.itemlist.map((item, index) => (
                        <div key={index}
                             className="item_table-body flex flex-row items-center">
                          <p className="heading-s text-8-text w-[17rem]">{item.item_name}</p>
                          <p className="heading-s text-7-info w-16 text-center">{item.quantity}</p>
                          <p className="heading-s text-7-info text-right w-[6rem]">$ {convertToCurrency(item.price)}</p>
                          <p
                            className="heading-s text-8-text flex-grow text-right">$ {getInvoiceTotal(item.quantity, item.price)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="invoice_summary-total-group bg-[#373B53] rounded-b-[0.5rem] flex flex-row justify-between items-center px-8 py-6">
                    <p className="body text-white mr-8">Amount Due</p>
                    <p className="heading-m text-white">$ {convertToCurrency(invoiceData.total)}</p>
                  </div>


                </div>

              </div>
            </div>
          </>
        )
        :
        (
          <>
            <h1>Loading...</h1>
          </>
        )}
    </>
  )


}
