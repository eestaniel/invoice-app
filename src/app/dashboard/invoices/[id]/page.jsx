"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/@/components/ui/button";
import {Sheet, SheetTrigger, SheetContent} from "@/@/components/ui/sheet";
import SheetView from "@/app/dashboard/invoices/components/invoice_forms/SheetView";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/@/components/ui/alert-dialog"
import {useContext} from "react";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {AuthContext} from "@/app/dashboard/context/AuthContext";


export default function Page({params}) {
  const {id} = params
  const type = 'summary'
  const [invoiceData, setInvoiceData] = useState({})
  const [status, setStatus] = useState('')
  const [sheetOpen, setSheetOpen] = useState(false);
  const {theme, updateSummary, toggleFetchInvoices} = useContext(InvoiceContext);
  const {currentUser} = useContext(AuthContext);


  const router = useRouter()


  function getStatusClasses(status) {
    let baseClasses = "w-[6rem] h-[2.75rem] flex flex-row rounded-[0.375rem] mr-0 lg:mr-[1.25rem] justify-center items-center heading-s-v capitalize bg-opacity-[6%]";
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
    // Convert 2023-11-09T00:00:00.000Z to Nov 9 2023
    const dateObj = new Date(date);
    const options = {month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'};
    return dateObj.toLocaleDateString('default', options);
  }

  const getPaymentDueDate = () => {
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

  const handleDelete = (id) => {
    // try if status not 201
    fetch(`/api/invoices?id=${id}&uid=${currentUser?.uid}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((delResp) => {
        if (delResp.status === 201) {
          toggleFetchInvoices();
        }
      })
      .then(() => {
        router.push('/dashboard/')
      })
  }

  const handleMarkAsPaid = (id) => {
    // try if status not 201
    const status = 'status'
    fetch(`/api/invoices?type=${status}&id=${id}`, {
      method: 'PUT',
    })
      .then(res => res.json())
      .then(() => {
        toggleFetchInvoices();
        setStatus('paid')
      })
  }

  useEffect(() => {
    fetch(`/api/invoices?type=${type}&id=${id}`)
      .then(res => res.json())
      .then(data => {
        setInvoiceData(data.body.invoice)
        setStatus(data.body.invoice.status)
      })

  }, [updateSummary]);


  return (
    <div className={`${theme.background} min-h-screen`}>
      {invoiceData?.id ?
        (
          <>
            <div
              className={`page_container  px-6
                pt-8 lg:pt-[4.0625rem] ${theme.background} min-h-screen h-fit w-full justify-center flex flex-col`}>
              <div className="w-full flex justify-center">
                <div
                  className="back_group flex flex-row items-center justify-start w-full h-[1rem] gap-[1.5rem] heading-s-v text-8-text mb-[2rem]
                  max-w-[730px] hover:cursor-pointer group"
                  onClick={() => {
                    router.back()
                  }}
                >
                  <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none"
                          fillRule="evenodd"/>
                  </svg>
                  <p className={`${theme.go_back}`}>Go back</p>
                </div>
              </div>

              <div className="hidden lg:inline">
                <div className="status_button-container flex justify-center w-full  h-[5.5rem] mb-[1.5rem] ">
                  <div
                    className={`flex flex-row justify-between max-w-[730px] grow ${theme.table_row} h-full px-8 py-6 rounded-[0.5rem]`}>
                    <div className="status-group flex flex-row items-center h-full gap-5 body-v text-[#858BB2]">
                      <p>Status</p>
                      <div
                        className={`status-button flex flex-row justify-center items-center w-[6.5rem] h-[2.75rem] rounded-[0.375rem] mr-[1.25rem] heading-s-v capitalize bg-opacity-[6%] ${getStatusClasses(status)}`}>
                        <li>{status}</li>
                      </div>
                    </div>
                    <div className="button-group flex flex-row gap-2">

                      <Sheet open={sheetOpen} onOpenChange={setSheetOpen} sheetType={'create'}>
                        <SheetTrigger asChild>
                          <Button
                            className={`px-6 py-[1.125rem] rounded-[1.5rem] heading-s-v ${theme.edit_button}`}
                          >
                            Edit
                          </Button>
                        </SheetTrigger>
                        <SheetContent className={"w-[100%] overflow-y-scroll max-h-screen web hide-scrollbar"}>
                          <SheetView setSheetOpen={setSheetOpen} sheetType={'edit'}
                                     data={invoiceData}/>
                        </SheetContent>
                      </Sheet>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            className="px-6 py-[1.125rem] rounded-[1.5rem] bg-9-accent text-white heading-s-v hover:bg-10-soft-red"

                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className={`p-12 ${theme.table_row} ${theme.delete_border}`}>
                          <AlertDialogHeader>
                            <AlertDialogTitle className={`heading-m ${theme.text}`}>Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription className={"body text-6-muted"}>
                              Are you sure you want to delete invoice #{invoiceData.custom_id}? This action cannot be.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className={"mt-4"}>
                            <AlertDialogCancel
                              className={`rounded-[1.5rem] ${theme.cancel_button}`}>Cancel</AlertDialogCancel>
                            <AlertDialogAction className={"rounded-[1.5rem] bg-9-accent text-white hover:brightness-75"}
                                               onClick={() => handleDelete(invoiceData.custom_id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        className="px-6 py-[1.125rem] rounded-[1.5rem] bg-1-primary text-white heading-s-v hover:bg-2-highlight"
                        disabled={status === 'paid'}
                        onClick={() => handleMarkAsPaid(invoiceData.custom_id)}
                      >Mark as
                        Paid</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:hidden">
                <div className="status_button-container flex justify-between w-full  h-[5.5rem] mb-[1.5rem] ">
                  <div
                    className={`flex flex-row justify-between max-w-[730px] grow ${theme.table_row} h-full px-8 py-6 rounded-[0.5rem]`}>
                    <div
                      className="status-group flex flex-row items-center h-full w-full justify-between gap-5 body-v text-[#858BB2]">
                      <p>Status</p>
                      <div
                        className={`status-button flex flex-row justify-center items-center w-[6.5rem] h-[2.75rem] rounded-[0.375rem] mr-[1.25rem] heading-s-v capitalize bg-opacity-[6%] ${getStatusClasses(status)}`}>
                        <li>{status}</li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="invoice_summary-container flex h-fit gap-4 w-full justify-center">
                <div
                  className={`w-full lg:max-w-[730px] grow justify-center flex flex-col ${theme.table_row} p-6 lg:p-12 rounded-[0.5rem]`}>
                  <div
                    className="invoice_summary-header-group flex flex-row md:flex-row justify-between gap-8 lg:gap-0">
                    <div className="summary_header gap-1 lg:gap-2 flex flex-col">
                      <h1 className="heading-s text-6-muted">#<span
                        className={`${theme.text}`}>{invoiceData.custom_id}</span>
                      </h1>
                      <p className={`body ${theme.table_date} uppercase `}>{invoiceData.project_description}</p>
                    </div>
                    <div className={`text-right summary_billfrom-group body ${theme.table_date}`}>
                      <p className="capitalize">{invoiceData.billfrom[0].street_address}</p>
                      <p className="capitalize">{invoiceData.billfrom[0].city}</p>
                      <p>{invoiceData.billfrom[0].post_code}</p>
                      <p className="capitalize">{invoiceData.billfrom[0].country}</p>
                    </div>
                  </div>

                  <div
                    className="invoice_summary-billto-group flex flex-row mb-12 mt-8 lg:mt-0 flex-wrap md:flex-nowrap justify-between">
                    <div className="invoice_payment-group flex flex-col gap-8 mr-[3.75rem] md:mr-0
                    md:justify-between">
                      <div className="invoice_date-group">
                        <p className={`payment_due_text ${theme.table_date} body-v mb-3 `}>Invoice Date</p>
                        <p
                          className={`payment_due_date heading-s ${theme.text} whitespace-nowrap`}>{convertDate(invoiceData.invoice_date)}</p>
                      </div>
                      <div className="invoice_due_date-group">
                        <p className={`payment_due_text ${theme.table_date} body-v mb-3`}>Payment Due</p>
                        <p
                          className={`payment_due_date heading-s ${theme.text}`}>{getPaymentDueDate(invoiceData.invoice_date)}</p>
                      </div>
                    </div>

                    <div className={`invoice_billto-group flex flex-col ${theme.table_date}`}>
                      <h2 className={`body-v ${theme.table_date} mb-3`}>Bill To</h2>
                      <p
                        className={`heading-s capitalize mb-2 whitespace-nowrap ${theme.text}`}>{invoiceData.billto[0].client_name}</p>
                      <p
                        className="body  capitalize whitespace-nowrap">{invoiceData.billto[0].street_address}</p>
                      <p className="body  capitalize">{invoiceData.billto[0].city}</p>
                      <p className="body  capitalize">{invoiceData.billto[0].post_code}</p>
                      <p className="body  capitalize">{invoiceData.billto[0].country}</p>
                    </div>

                    <div className="client_email-group flex flex-col w-full md:w-fit mt-8 md:mt-0 lg:mr-[8rem]">
                      <p className={`body-v ${theme.table_date} mb-3`}>Sent to</p>
                      <p className={`heading-s capitalize ${theme.text}`}>{invoiceData.billto[0].client_email}</p>
                    </div>
                  </div>

                  <div className="invoice_summary-item-group w-full h-fit  rounded-[0.5rem]">
                    <div className={`${theme.summary_table} p-6 lg:p-8 rounded-t-[0.5rem] `}>
                      <div className="hidden lg:inline">
                        <div className=" item_table-header-group flex flex-row justify-between mb-6 ">
                          <div className={`item_table-header flex flex-row w-full`}>
                            <p className={`body max-w-[16rem] w-full ${theme.table_due}`}>Item Name</p>
                            <p className={`body max-w-[2rem] w-full text-center ${theme.table_due}`}>QTY.</p>
                            <p className={`body max-w-[8rem] w-full text-right ${theme.table_due}`}>Price</p>
                            <p className={`body flex-grow text-right ${theme.table_due}`}>Total</p>
                          </div>
                        </div>
                      </div>
                      <div className="item_table-body-group flex flex-col gap-4">
                        {invoiceData.itemlist.map((item, index) => (
                          <div key={index} className="item_table-body flex flex-row text-left flex-wrap h-full">
                            <p
                              className={`heading-s ${theme.text} w-full lg:max-w-[16rem] lg:w-full `}>{item.item_name}</p>
                            <p
                              className={`heading-s ${theme.summary_price_info} lg:${theme.table_date} lg:w-full lg:max-w-[2rem] text-left lg:text-center`}>{item.quantity}
                              <span
                                className="lg:hidden mr-1">x</span></p>
                            <p
                              className={`heading-s ${theme.summary_price_info}  lg:${theme.table_date} text-left lg:text-right lg:max-w-[8rem] lg:w-full`}>$ {convertToCurrency(item.price)}</p>
                            <p
                              className={`heading-s ${theme.text} flex-grow text-right`}>$ {getInvoiceTotal(item.quantity, item.price)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`invoice_summary-total-group ${theme.summary_total} rounded-b-[0.5rem] flex flex-row justify-between items-center px-8 py-6`}>
                      <p className="body text-white mr-8">Amount Due</p>
                      <p className="heading-m text-white">$ {convertToCurrency(invoiceData.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <div className="status_button-container flex justify-center w-full h-[90px] mt-[2.5rem]  ">
                <div
                  className={`flex flex-row justify-center w-full grow ${theme.table_row} py-6 h-full px-6 `}>
                  <div className="button-group flex flex-row gap-2 w-full justify-center">
                    <Sheet open={sheetOpen} onOpenChange={setSheetOpen} sheetType={'create'}>
                      <SheetTrigger asChild>
                        <Button
                          className="px-5 py-[1.5rem] flex grow rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v hover:bg-5-secondary"
                        >
                          Edit
                        </Button>
                      </SheetTrigger>
                      <SheetContent className={"w-[100%] overflow-y-scroll max-h-screen web hide-scrollbar"}>
                        <SheetView setSheetOpen={setSheetOpen} sheetType={'edit'}
                                   data={invoiceData}/>
                      </SheetContent>
                    </Sheet>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          className="px-6 py-[1.5rem] flex grow rounded-[1.5rem] bg-9-accent text-white heading-s-v hover:bg-10-soft-red"

                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className={`p-12 ${theme.table_row} ${theme.delete_border}`}>
                        <AlertDialogHeader>
                          <AlertDialogTitle className={`heading-m ${theme.text}`}>Confirm Deletion</AlertDialogTitle>
                          <AlertDialogDescription className={"body text-6-muted"}>
                            Are you sure you want to delete invoice #{invoiceData.custom_id}? This action cannot be.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className={"mt-4"}>
                          <AlertDialogCancel
                            className={`rounded-[1.5rem] ${theme.cancel_button}`}>Cancel</AlertDialogCancel>
                          <AlertDialogAction className={"rounded-[1.5rem] bg-9-accent text-white hover:bg-10-soft-red"}
                                             onClick={() => handleDelete(invoiceData.custom_id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      className="px-6 py-[1.5rem] flex grow rounded-[1.5rem] bg-1-primary text-white heading-s-v hover:bg-2-highlight"
                      disabled={status === 'paid'}
                      onClick={() => handleMarkAsPaid(invoiceData.custom_id)}
                    >Mark as
                      Paid</Button>
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
    </div>
  )


}
