import BillFrom from "@/app/dashboard/invoices/components/invoice_forms/BillFrom";
import BillTo from "@/app/dashboard/invoices/components/invoice_forms/BillTo";
import InvoiceDetails from "@/app/dashboard/invoices/components/invoice_forms/InvoiceDetails";
import InvoiceList from "@/app/dashboard/invoices/components/invoice_forms/InvoiceList";
import CreateButtons from "@/app/dashboard/invoices/components/invoice_forms/CreateButtons";
import EditButtons from "@/app/dashboard/invoices/components/invoice_forms/EditButtons";
import {FormProvider, useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {invoiceFormSchema} from "@/app/dashboard/invoices/components/invoice_forms/schemas/invoiceSchema";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext, useEffect, useState} from "react";


export default function SheetView({setSheetOpen, sheetType, data}) {
  const {
    theme,
    setSelectedInvoice,
    setInvoiceList,
    invoiceList
  } = useContext(InvoiceContext);
  const [customId, setCustomId] = useState('');

  const methods = useForm({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoice_details: {
        invoice_date: new Date(),
        payment_terms: 'Net 30 Days',
      },
    }
  });


  const {reset, control} = methods;
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'item_list',
  });

  // Function to parse a date string as UTC
  function parseDateAsUTC(dateString) {
    // new date 2023-11-21T00:00:00.000Z keep the same day
    const date = new Date(dateString);
    // get the timezone offset
    const timezoneOffset = date.getTimezoneOffset();
    // get the number of milliseconds since unix epoch
    const timeSinceEpoch = date.getTime();
    // convert to UTC by adding/subtracting the timezone offset
    const utcTime = timeSinceEpoch + (timezoneOffset * 60 * 1000);
    // return as a date string
    return new Date(utcTime);
  }

  useEffect(() => {
    if (data) {
      setCustomId(data.custom_id);
      reset(data);
      console.log('data', data)

    }
  }, []);

  const sendPostRequest = async (data) => {
    try {
      await fetch('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      return {createdInvoiceDB: 'success'}
    } catch (err) {
      return Response.error(err)
    }
  }

  const sendPutRequest = async (data) => {
    try {
      const res = await fetch(`/api/invoices?type=${data.invoice_details.type}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })

      await res.json()
      return {updatedInvoiceDB: 'success'}
    } catch (err) {
      return Response.error(err)
    }
  }
  const updateSelectedInvoice = async (data) => {
    // convert due_date to "Dec 17, 2023" format
    data.invoice_details.due_date = parseDateAsUTC(data.invoice_details.due_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    data.invoice_details.invoice_date = parseDateAsUTC(data.invoice_details.invoice_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    // update context selectedInvoice
    setSelectedInvoice(data);


    return {updatedSelectedInvoice: 'Success'}
  }
  const appendToInvoiceList = async (data) => {
    // convert due_date to "Dec 17, 2023" format
    data.invoice_details.due_date = parseDateAsUTC(data.invoice_details.due_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    data.invoice_details.invoice_date = parseDateAsUTC(data.invoice_details.invoice_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    // append data to invoiceList and sort by due_date ascending
    setInvoiceList([...invoiceList, data].sort((a, b) => {
      return new Date(a.invoice_details.due_date) - new Date(b.invoice_details.due_date);
    }))
  }

  const updateInvoiceList = async (data) => {
    // convert due_date to "Dec 17, 2023" format
    data.invoice_details.due_date = parseDateAsUTC(data.invoice_details.due_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    data.invoice_details.invoice_date = parseDateAsUTC(data.invoice_details.invoice_date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const index = invoiceList.findIndex((invoice) => invoice.invoice_details.custom_id === data.invoice_details.custom_id);
    setInvoiceList([
      ...invoiceList.slice(0, index),
      data,
      ...invoiceList.slice(index + 1)
    ])

    console.log('invoiceList updated', invoiceList)

    return {updatedInvoiceList: 'Success'}
  }


  const onSubmit = (data) => {
    setSheetOpen(false);

    if (data.invoice_details.type === 'create') {
      Promise.all([
        sendPostRequest(data),
        appendToInvoiceList(data)
      ]).then((res) => {
        console.log('res', res)
      })
    } else if (data.invoice_details.type === 'update') {
      // concurrency/ promiseAll:
      // 1. send put request to update invoice
      // 2. update context selectedInvoice
      // 3. update context invoiceList object with updated invoice by custom id

      Promise.all([
        sendPutRequest(data),
        updateSelectedInvoice(data),
        updateInvoiceList(data)

      ]).then((res) => {
        console.log('res', res)
      })
    }
  };
  const onInvalid = (errors) => console.error(errors)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)} className={`${theme.sheet_bg}`}>
        <div id="thisForm"
             className={`px-6 lg:px-[3.5rem] pt-24 lg:pt-[8.75rem] lg:mt-[0]   xl:pl-[10.5rem] xl:pr-[3.5rem] w-full 
               flex flex-col flex-grow  ${theme.sheet_bg}`}>

          <div className="lg:hidden flex flex-row items-center gap-6 mb-6">
            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.342.886L2.114 5.114l4.228 4.228" stroke="#9277FF" strokeWidth="2" fill="none"
                    fillRule="evenodd"/>
            </svg>
            <p className={`heading-s ${theme.go_back} hover:cursor-pointer`}
               onClick={() => {
                 setSheetOpen(false);
               }}
            >
              Go back
            </p>

          </div>

          {/* check if custom id*/}
          {customId === '' ? <h1 className={`heading-m ${theme.text}`}>New Invoice</h1> :
            <h1 className={`heading-m ${theme.text}`}>
              Edit <span className="text-7-info">#</span>{customId}</h1>}

          {/* Bill From*/}
          <BillFrom/>

          {/* Bill to*/}
          <BillTo/>

          {/* Invoice Details */}
          <InvoiceDetails/>

          {/* Invoice Item List */}
          <InvoiceList fields={fields} onAppend={append} onRemove={remove}/>

        </div>
        {/* Button Groups*/}
        <div
          className={`container-bottom-nav w-full h-fit lg:h-[6.875rem] lg:sticky lg:bottom-0 ${theme.background} xl:pl-[7rem]`}>
          {sheetType !== 'edit' ?
            <CreateButtons/>
            :
            <EditButtons/>
          }
        </div>

      </form>
    </FormProvider>
  )
    ;
}
