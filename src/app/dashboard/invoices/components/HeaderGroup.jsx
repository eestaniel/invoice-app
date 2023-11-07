"use client"
import {useEffect, useContext, useState} from "react"
import {Button} from "@/@/components/ui/button";
import {InvoiceContext} from "@/app/dashboard/invoices/context/InvoiceContext";
import Filter from "@/app/dashboard/invoices/components/Filter";
import SheetView from "@/app/dashboard/invoices/components/SheetView";
import {Sheet, SheetTrigger, SheetContent} from "@/@/components/ui/sheet";

export default function HeaderGroup() {
  const {invoiceList, addInvoice} = useContext(InvoiceContext);
  const [isSheetOpen, setSheetOpen] = useState(false);


  useEffect(() => {
    console.log(invoiceList)
  }, [invoiceList])

  return (
    <div className="content px-[22rem] pt-[4.875rem] w-screen relative">
      <div className="invoice-header-container flex flex-row items-center justify-between w-full gap-[2.5rem] relative">
        <div className="group1 flex flex-row justify-between w-full">
          <div className="header-group">
            <h1 className="heading-l">Invoices</h1>
            <p className="body-v text-6-muted ]">There are {invoiceList ? invoiceList.length : 0} total invoices</p>
          </div>
        </div>

        <Filter/>

        <div className="group2">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                className="bg-1-primary text-white rounded-[1.5rem] h-[3rem] w-[9.375rem] p-0 gap-[1rem] hover:bg-2-highlight"
                onClick={() => setSheetOpen(true)}
              >
                <svg className="w-[2rem] h-[2rem] bg-white rounded-full flex justify-center " width="11" height="11"
                     xmlns="http://www.w3.org/2000/svg" viewBox="-7 0 25 10">
                  <path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA"
                        fillRule="nonzero"/>
                </svg>
                <p className="heading-s-v whitespace-nowrap">New Invoice</p>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="ml-[7rem]">
              <SheetView/>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
