import {SheetClose} from "@/@/components/ui/sheet";
import {Button} from "@/@/components/ui/button";

export default function CreateButtons({setInvoiceOptions, invoiceData}) {
  return (
    <div
      className="group-buttons flex flex-row justify-between gap-[0.5rem] mt-[3rem]  w-full h-[6.875rem] grow p-[1.5rem]">
      <SheetClose asChild>
        <Button
          className="w-[6rem] h-[3rem] rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v stick hover:bg-9-accent hover:text-8-text">
          Discard
        </Button>
      </SheetClose>
      <div className="groupbuttons flex flex-row gap-[0.5rem]">
        <SheetClose asChild>
          <Button
            className="w-[8.25rem] h-[3rem] rounded-[1.5rem] bg-[#373B53] heading-s-v text-6-muted hover:cursor-pointer hover:bg-8-text"
            onClick={(e) => {
              console.log('draft')
              const form = e.target.form
              const method = form.getAttribute('method').toUpperCase()
              const action = form.getAttribute('action')
              setInvoiceOptions(prev => {
                return {
                  ...prev,
                  action: action,
                  body: invoiceData,
                  method: method,
                  invoiceData: invoiceData,
                  type: 'create',
                  status: 'draft'
                }
              })
            }}>
            Save as Draft
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            className="w-[8rem] h-[3rem] rounded-[1.5rem] bg-1-primary heading-s-v text-white hover:cursor-pointer hover:bg-2-highlight"
            onClick={(e) => {
              const form = e.target.form
              const method = form.getAttribute('method').toUpperCase()
              const action = form.getAttribute('action')
              setInvoiceOptions(prev => {
                return {
                  ...prev,
                  action: action,
                  body: invoiceData,
                  method: method,
                  invoiceData: invoiceData,
                  type: 'create',
                  status: 'pending'
                }
              })
            }}>
            Save & Send
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}
