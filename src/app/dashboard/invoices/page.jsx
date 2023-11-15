"use client"
import HeaderGroup from "@/app/dashboard/invoices/components/HeaderGroup";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext, useEffect} from "react";
import EmptyInvoice from "@/app/dashboard/invoices/components/EmptyInvoice";
import InvoiceTable from "@/app/dashboard/invoices/components/InvoiceTable";


export default function Page() {
  const {invoiceList, setInvoices, shouldFetchInvoices} = useContext(InvoiceContext);

  const fetchInvoices = () => {
    const type = ['ids'];
    fetch(`/api/invoices?type=${type}`).then(res => res.json()).then(data => {
      setInvoices(data.body.invoices);
    });
  };

  // useEffect that depends on the state updated by useCallback
  useEffect(() => {
    fetchInvoices();
  }, [shouldFetchInvoices, invoiceList]);


  return (
    <div className="invoices__page-container bg-11-light flex flex-col 100%  min-h-screen h-fit items-center z-50 w-full
    gap-8 lg:gap-[4rem] px-6 lg:px-[3rem] pt-8 xl:pt-[5.785rem]">
      <HeaderGroup/>
      <div className="table_row-container flex w-full h-fit items-center justify-center px:6 xl:
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
