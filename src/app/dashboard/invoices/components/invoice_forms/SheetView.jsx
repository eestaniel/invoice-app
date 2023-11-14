import BillFrom from "@/app/dashboard/invoices/components/invoice_forms/BillFrom";
import BillTo from "@/app/dashboard/invoices/components/invoice_forms/BillTo";
import InvoiceDetails from "@/app/dashboard/invoices/components/invoice_forms/InvoiceDetails";
import InvoiceList from "@/app/dashboard/invoices/components/invoice_forms/InvoiceList";
import CreateButtons from "@/app/dashboard/invoices/components/invoice_forms/CreateButtons";
import EditButtons from "@/app/dashboard/invoices/components/invoice_forms/EditButtons";
import {useForm, FormProvider, useFieldArray} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {invoiceFormSchema} from "@/app/dashboard/invoices/components/invoice_forms/schemas/invoiceSchema";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext, useEffect} from "react";


export default function SheetView({setSheetOpen, sheetType, data}) {
  const {useCallback, setUseCallback} = useContext(InvoiceContext);


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

      const newData = {
        bill_from: data.billfrom[0],
        bill_to: data.billto[0],
        invoice_details: {
          id: data.id,
          custom_id: data.custom_id,
          //
          invoice_date: parseDateAsUTC(data.invoice_date),
          due_date: parseDateAsUTC(data.due_date),
          payment_terms: data.payment_terms,
          status: data.status,
          project_description: data.project_description,
          total: data.total,
        },
        //convert itemlist to object instead ...
        item_list: data.itemlist.map((item) => {
          return {
            name: item.item_name,
            quantity: item.quantity,
            price: item.price,
            total: item.total,
          }
        })
      }
      console.log(data.invoice_date)
      console.log(parseDateAsUTC(newData.invoice_details.invoice_date))

      reset(newData);

    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    setSheetOpen(false);
    setUseCallback(!useCallback);
    if (data.invoice_details.type === 'create') {
      fetch('/api/invoices', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
        .finally(() => {
        })
    } else if (data.invoice_details.type === 'update') {
      fetch(`/api/invoices?type=${data.invoice_details.type}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err))
        .finally(() => {
        })
    }
  };
  const onInvalid = (errors) => console.error(errors)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
        <div id="thisForm"
             className="xl:pl-[10.5rem] xl:pr-[3.5rem] w-full overflow-auto xl:mt-10 flex flex-col flex-grow h-fit">
          <h1 className="heading-m">New Invoice</h1>

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
        <div className="container-bottom-nav w-full h-[6.875rem] sticky bottom-0 bg-white pl-[7rem]">
          {sheetType !== 'edit' ?
            <CreateButtons/>
            :
            <EditButtons/>
          }
        </div>
      </form>
    </FormProvider>
  );
}
