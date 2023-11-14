"use client"
import {useContext, useState} from "react"
import {Button} from "@/@/components/ui/button";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import Filter from "@/app/dashboard/invoices/components/Filter";
import SheetView from "@/app/dashboard/invoices/components/invoice_forms/SheetView";
import {Sheet, SheetTrigger, SheetContent} from "@/@/components/ui/sheet";

export default function HeaderGroup() {
  const {invoiceList} = useContext(InvoiceContext);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="header-container xl:px-[22rem] xl:pt-[4.875rem] w-full h-fit justify-center relative">
      <div className="invoice-header-container flex flex-row items-center justify-between w-full relative">
        <div className="group1 flex flex-row justify-between w-fit">
          <div className="header-group">
            <h1 className="heading-m xl:heading-l">Invoices</h1>
            <p className="body-v text-6-muted">
              {/* Default text for smaller screens */}
              <span className="xl:hidden">{invoiceList.length} invoices</span>

              {/* Text for xl screens and larger */}
              <span className="hidden xl:inline">There are {invoiceList.length} total invoices</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Filter/>
          <div className="group2">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  className="bg-1-primary text-white rounded-[1.5rem] h-[44px] xl:h-[3rem] w-[90px] xl:w-[9.375rem] p-0
                   gap-2 xl:gap-[1rem] hover:bg-2-highlight"
                >
                  <svg className="w-[2rem] h-[2rem] bg-white rounded-full flex justify-center " width="11" height="11"
                       xmlns="http://www.w3.org/2000/svg" viewBox="-7 0 25 10">
                    <path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA"
                          fillRule="nonzero"/>
                  </svg>
                  <p className="heading-s-v whitespace-nowrap">
                    <span className="xl:hidden pr-2">New</span>
                    <span className="hidden xl:inline">New Invoice</span>
                  </p>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[100%] overflow-y-auto max-h-screen web hide-scrollbar">
                <SheetView setSheetOpen={setSheetOpen} sheetType={'create'}/>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
