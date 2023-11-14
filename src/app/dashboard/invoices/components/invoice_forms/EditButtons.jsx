import {SheetClose} from "@/@/components/ui/sheet";
import {Button} from "@/@/components/ui/button";

export default function EditButtons({setInvoiceOptions, invoiceData}) {
  return (
    (<div
        className="group-buttons flex flex-row justify-end gap-[0.5rem] mt-[3rem]  w-full h-[6.875rem] grow p-[1.5rem]">
        <SheetClose asChild>
          <Button
            className="w-[6rem] h-[3rem] rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v stick">
            Cancel
          </Button>
        </SheetClose>
        <div className="groupbuttons flex flex-row gap-[0.5rem]">
          <SheetClose asChild>
            <Button className="w-[8rem] h-[3rem] rounded-[1.5rem] bg-1-primary text-white"
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
                          type: 'create'
                        }
                      })
                    }}>
              Save Changes
            </Button>
          </SheetClose>
        </div>
      </div>
    )
  );
}
