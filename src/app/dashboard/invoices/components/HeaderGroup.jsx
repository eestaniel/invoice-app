"use client"
import {useContext, useState} from "react"
import {Button} from "@/@/components/ui/button";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import Filter from "@/app/dashboard/invoices/components/Filter";
import SheetView from "@/app/dashboard/invoices/components/invoice_forms/SheetView";
import {Sheet, SheetTrigger, SheetContent} from "@/@/components/ui/sheet";

export default function HeaderGroup() {
  const {invoiceList, theme} = useContext(InvoiceContext);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="header-container w-full h-fit justify-center relative flex flex-row">
      <div className="invoice-header-container flex flex-row items-center justify-between lg:basis-[520px] flex-grow max-w-[730px] flex-shrink-0  relative
        ">

        <div className="group1 flex flex-row justify-between flex-grow">
          <div className="header-group">
            <h1 className={`heading-m lg:heading-l ${theme.page_header}`}>Invoices</h1>
            <p className="body-v text-6-muted">
              {/* Default text for smaller screens */}
              <span className="lg:hidden">{invoiceList?.length} invoices</span>

              {/* Text for xl screens and larger */}
              <span className="hidden lg:inline  ">There are {invoiceList?.length} total invoices</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Filter/>
          <div className="group2">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  className="bg-1-primary text-white rounded-[1.5rem] h-[44px] lg:h-[3rem] w-[90px] lg:w-[9.375rem] p-0
                   gap-2 lg:gap-[1rem] hover:bg-2-highlight"
                >
                  <svg className="w-[2rem] h-[2rem] bg-white rounded-full flex justify-center " width="11" height="11"
                       xmlns="http://www.w3.org/2000/svg" viewBox="-7 0 25 10">
                    <path d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z" fill="#7C5DFA"
                          fillRule="nonzero"/>
                  </svg>
                  <p className="heading-s-v whitespace-nowrap">
                    <span className="lg:hidden pr-2">New</span>
                    <span className="hidden lg:inline">New Invoice</span>
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
