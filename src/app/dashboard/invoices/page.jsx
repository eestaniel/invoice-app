"use client"
import HeaderGroup from "@/app/dashboard/invoices/components/HeaderGroup";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext, useEffect} from "react";
import EmptyInvoice from "@/app/dashboard/invoices/components/EmptyInvoice";
import InvoiceTable from "@/app/dashboard/invoices/components/InvoiceTable";


export default function Page() {
  const {invoiceList, setInvoices, useCallback} = useContext(InvoiceContext);

  // on mount, fetch invoices from api
  useEffect(() => {
    const type = ['ids']
    fetch(`/api/invoices?type=${type}`).then(res => res.json()).then(data => {
      setInvoices(data.body.invoices)
    })
  }, [])
  // on mount, fetch invoices from api
  useEffect(() => {
    const type = ['ids']
    fetch(`/api/invoices?type=${type}`).then(res => res.json()).then(data => {
      setInvoices(data.body.invoices)
    })
  }, [useCallback])

  return (
    <div className="invoices__page-container bg-11-light flex flex-col 100%  min-h-screen h-fit items-center z-50 w-full
    gap-8 xl:gap-[4rem] px-6 pt-8">
      <HeaderGroup/>
      <div className=" table_row-container flex w-full h-fit items-center justify-center px:6 xl:px-[15.75rem]
      ">
        {invoiceList.length === 0 ? (
          <EmptyInvoice/>
        ) : (
          <InvoiceTable/>
        )}

      </div>
    </div>


  );
}
