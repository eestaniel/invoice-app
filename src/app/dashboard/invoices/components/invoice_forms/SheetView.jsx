"use client"
import {useState, useEffect, useRef} from "react";
import BillFrom from "@/app/dashboard/invoices/components/invoice_forms/BillFrom";
import BillTo from "@/app/dashboard/invoices/components/invoice_forms/BillTo";
import InvoiceDetails from "@/app/dashboard/invoices/components/invoice_forms/InvoiceDetails";
import InvoiceList from "@/app/dashboard/invoices/components/invoice_forms/InvoiceList";
import CreateButtons from "@/app/dashboard/invoices/components/invoice_forms/CreateButtons";
import EditButtons from "@/app/dashboard/invoices/components/invoice_forms/EditButtons";
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {invoiceFormSchema} from "@/app/dashboard/invoices/components/invoice_forms/schemas/invoiceSchema";


export default function SheetView({setInvoiceOptions, sheetType, data, sheetMethod}) {
  const [invoiceData, setInvoiceData] = useState({
    billFrom: {
      address: '',
      city: '',
      post_code: '',
      country: ''
    },
    billTo: {
      clientName: '',
      clientEmail: '',
      address: '',
      city: '',
      post_code: '',
      country: ''
    },
    invoiceDetails: {
      invoiceDate: new Date().toString(),
      paymentTerms: 'Net 30 Days',
      projectDescription: '',
      custom_id: '',
      status: ''
    },
    itemList: []

  });

  const formRef = useRef(null);


  const handleChange = (section, field, value, index = null) => {
    // Process the value if it's the post code
    const processedValue = field === 'post_code' ? parseInt(value, 10) || '' : value;

    if (index != null) {
      // Handle itemList array
      const newItems = [...invoiceData[section]];
      newItems[index] = {
        ...newItems[index],
        [field]: processedValue // Use processedValue here
      };
      setInvoiceData({
        ...invoiceData,
        [section]: newItems
      });
    } else {
      // Handle other fields
      setInvoiceData({
        ...invoiceData,
        [section]: {
          ...invoiceData[section],
          [field]: processedValue // And also here
        }
      });
    }
  };


  useEffect(() => {
    if (sheetType === 'edit') {
      setInvoiceData({
        ...invoiceData,
        billFrom: {
          ...invoiceData.billFrom,
          address: data.billfrom[0].address,
          city: data.billfrom[0].city,
          post_code: data.billfrom[0].post_code,
          country: data.billfrom[0].country,
          id: data.billfrom[0].id
        },
        billTo: {
          ...invoiceData.billTo,
          clientName: data.billto[0].client_name,
          clientEmail: data.billto[0].client_email,
          address: data.billto[0].address,
          city: data.billto[0].city,
          post_code: data.billto[0].post_code,
          country: data.billto[0].country,
          id: data.billto[0].id
        },
        invoiceDetails: {
          ...invoiceData.invoiceDetails,
          invoiceDate: data.invoice_date,
          paymentTerms: data.payment_terms,
          projectDescription: data.project_description,
          custom_id: data.custom_id,
          id: data.id
        },
        itemList: data.itemlist
      })

    } else {
      /* get todays date dd/mon/yyyy*/
      /*first three letters of month*/
      const today = new Date();
      const dd = today.getDate();
      const mm = today.toLocaleString('default', {month: 'short'});
      const yyyy = today.getFullYear();

      /*const todayDate = `${dd} ${mm} ${yyyy}`;*/
      setInvoiceData({
        ...invoiceData,
        invoiceDetails: {
          ...invoiceData.invoiceDetails,
          invoiceDate: `${dd} ${mm} ${yyyy}`
        }
      })
    }

  }, [])

  const methods = useForm({
    resolver: zodResolver(invoiceFormSchema)
  });
  const { handleSubmit, formState: { errors } } = methods;
  const onSubmit = data => {
    // Handle the form submission logic here
    console.log('submit')
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} method={`${sheetMethod}`} action="/api/invoices" >
        <div id="thisForm" ref={formRef}
             className="pl-[10.5rem] pr-[3.5rem] w-full] overflow-auto mt-10 flex flex-col flex-grow h-fit">
          <h1 className="heading-m">New Invoice</h1>

          {/* Bill From*/}
          <BillFrom invoiceData={invoiceData} handleChange={handleChange}/>

          {/* Bill to*/}
          <BillTo invoiceData={invoiceData} handleChange={handleChange}/>

          {/* Invoice Details */}
          <InvoiceDetails invoiceData={invoiceData} handleChange={handleChange} formRef={formRef}/>

          {/* Invoice Item List */}
          <InvoiceList invoiceData={invoiceData} handleChange={handleChange} setInvoiceData={setInvoiceData}/>
        </div>

        {/* Button Groups*/}
        <div className="container-bottom-nav w-full h-[6.875rem] sticky bottom-0 bg-white pl-[7rem]">
          {sheetType !== 'edit' ?
            <CreateButtons setInvoiceOptions={setInvoiceOptions} invoiceData={invoiceData}/>
            :
            <EditButtons setInvoiceOptions={setInvoiceOptions} invoiceData={invoiceData}/>
          }
        </div>
      </form>
    </FormProvider>
  );
}
