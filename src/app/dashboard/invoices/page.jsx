"use client"
import HeaderGroup from "@/app/dashboard/invoices/components/HeaderGroup";
import {InvoiceContext} from "@/app/dashboard/invoices/context/InvoiceContext";
import {useContext} from "react";
import EmptyInvoice from "@/app/dashboard/invoices/components/EmptyInvoice";

export default function Page() {
  const {invoiceList} = useContext(InvoiceContext);

  return (
    <div className="flex flex-col w-full  min-h-screen items-center">
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
