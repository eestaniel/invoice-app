"use client"
import HeaderGroup from "@/app/dashboard/invoices/components/HeaderGroup";
import {InvoiceContext} from "@/app/dashboard/invoices/context/InvoiceContext";
import {useContext} from "react";
import EmptyInvoice from "@/app/dashboard/invoices/components/EmptyInvoice";

export default function Page() {
  const {invoiceList} = useContext(InvoiceContext);

  return (
    <div className="invoices__page-container flex flex-col 100%  min-h-screen h-screen items-center z-50 w-screen">
      <HeaderGroup/>
      <>
        {invoiceList.length === 0 ? (
          <EmptyInvoice/>
        ) : (
          <></>
        )}

      </>
    </div>


  );
}
