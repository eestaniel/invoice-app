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
import {useContext} from "react";


export default function SheetView({setSheetOpen, sheetType}) {
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

  const { control } = methods;
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'item_list',
  });

  const onSubmit = (data) => {
    console.log(data);
    setSheetOpen(false);
    setUseCallback(!useCallback);

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


  };
  const onInvalid = (errors) => console.error(errors)

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onInvalid)}>
        <div id="thisForm"
             className="pl-[10.5rem] pr-[3.5rem] w-full] overflow-auto mt-10 flex flex-col flex-grow h-fit">
          <h1 className="heading-m">New Invoice</h1>

          {/* Bill From*/}
          <BillFrom/>

          {/* Bill to*/}
          <BillTo/>

          {/* Invoice Details */}
          <InvoiceDetails />

          {/* Invoice Item List */}
          <InvoiceList fields={fields} onAppend={append} onRemove={remove}/>
        </div>

        {/* Button Groups*/}
        <div className="container-bottom-nav w-full h-[6.875rem] sticky bottom-0 bg-white pl-[7rem]">
          {sheetType !== 'edit' ?
            <CreateButtons />
            :
            <EditButtons/>
          }
        </div>
      </form>
    </FormProvider>
  );
}
