"use client"
import HeaderGroup from "@/app/dashboard/invoices/components/HeaderGroup";
import {InvoiceContext} from "@/app/dashboard/invoices/context/InvoiceContext";
import {useContext, useEffect} from "react";
import EmptyInvoice from "@/app/dashboard/invoices/components/EmptyInvoice";
import InvoiceTable from "@/app/dashboard/invoices/components/InvoiceTable";


export default function Page() {
  const {invoiceList, setInvoices, useCallback} = useContext(InvoiceContext);

  // on mount, fetch invoices from api
  useEffect(() => {
    // send fetch get to /api/invoices to get list of invoices
    const requestOptions = {
      method: 'GET',
    }
    fetch('/api/invoices', requestOptions).then(res => res.json()).then(data => {
      // data.body.ids = array of invoice id objects {id: "1234"}
      // set local state invoiceList to data.body.ids
      // set context state invoiceList to data.body.ids
      setInvoices(data.body.ids)

    })
  }, [useCallback])

  return (
    <div className="invoices__page-container flex flex-col 100%  min-h-screen h-screen items-center z-50 w-screen">
      <HeaderGroup/>
      <>
        {invoiceList.length === 0 ? (
          <EmptyInvoice/>
        ) : (
          <InvoiceTable/>
        )}

      </>
    </div>


  );
}
