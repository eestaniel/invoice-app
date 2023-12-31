import {SheetClose} from "@/@/components/ui/sheet";
import {Button} from "@/@/components/ui/button";
import {useFormContext} from "react-hook-form";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext} from "react";
import {AuthContext} from "@/app/dashboard/context/AuthContext";
import {Toaster} from "@/@/components/ui/toaster"
import {useToast} from "@/@/components/ui/use-toast"

export default function EditButtons() {
  const {setValue, getValues} = useFormContext();
  const {theme} = useContext(InvoiceContext);
  const {currentUser} = useContext(AuthContext);
  const status = getValues().invoice_details.status;
  const {toast} = useToast()

  const setDueDate = () => {
    const paymentTerms = getValues().invoice_details.payment_terms;
    const invoiceDate = getValues().invoice_details.invoice_date;
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + parseInt(paymentTerms.replace(/\D/g, '')));

    //convert dueDate to string

    setValue('invoice_details.due_date', dueDate);
  }

  const setTotal = () => {
    const items = getValues().item_list;
    const total = items.reduce((acc, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price) || 0;
      return parseFloat((acc + quantity * price).toFixed(2));
    }, 0);
    setValue('invoice_details.total', total);
  };

  return (
    (<div
        className={`group-buttons flex flex-row justify-end gap-[0.5rem] mt-[3rem]  w-full h-[6.875rem] grow p-[1.5rem]
        ${theme.sheet_bg}`}>
        <SheetClose asChild>
          <Button
            className={`w-[6rem] h-[3rem] rounded-[1.5rem] ${theme.edit_cancel} heading-s-v stick`}>
            Cancel
          </Button>
        </SheetClose>
        <div className="groupbuttons flex flex-row gap-[0.5rem]">

          <Button className="w-[8rem] h-[3rem] rounded-[1.5rem] bg-1-primary text-white hover:bg-2-highlight"
                  type="submit"
                  onClick={() => {
                    // calculate and set due date
                    setDueDate()
                    // calculate and set total
                    setTotal()
                    // generate and set custom_id: random 2 letters + 4 digits: XY1234
                    setValue('invoice_details.type', 'update')
                    setValue('invoice_details.uid', currentUser.uid)
                    // convert data.invoice_details.invoice_date to Date object
                    const invoiceDate = getValues().invoice_details.invoice_date;
                    setValue('invoice_details.invoice_date', new Date(invoiceDate))
                    // convert due_date to Date object using format(new Date(formValues.invoice_date), 'd MMM yyyy')
                    const dueData = getValues().invoice_details.due_date;
                    // if status is draft, set to pending
                    if (status === 'draft') {
                      setValue('invoice_details.status', 'pending')
                    }

                    toast({
                      variant: 'success',
                      title: "Saving your invoice",
                      description: "Your invoice is being saved. Please wait a moment.",
                    })

                  }}>
            Save Changes
          </Button>

        </div>
      </div>
    )
  );
}
