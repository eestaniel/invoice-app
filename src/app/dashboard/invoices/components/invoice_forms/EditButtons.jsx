import {SheetClose} from "@/@/components/ui/sheet";
import {Button} from "@/@/components/ui/button";
import {useFormContext} from "react-hook-form";


export default function EditButtons() {
  const {setValue, getValues} = useFormContext();


  const setDueDate = () => {
    const paymentTerms = getValues().invoice_details.payment_terms;
    const invoiceDate = getValues().invoice_details.invoice_date;
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + parseInt(paymentTerms.replace(/\D/g, '')));
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
        className="group-buttons flex flex-row justify-end gap-[0.5rem] mt-[3rem]  w-full h-[6.875rem] grow p-[1.5rem]">
        <SheetClose asChild>
          <Button
            className="w-[6rem] h-[3rem] rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v stick">
            Cancel
          </Button>
        </SheetClose>
        <div className="groupbuttons flex flex-row gap-[0.5rem]">

          <Button className="w-[8rem] h-[3rem] rounded-[1.5rem] bg-1-primary text-white"
                  onClick={() => {
                    // calculate and set due date
                    setDueDate()
                    // calculate and set total
                    setTotal()
                    // generate and set custom_id: random 2 letters + 4 digits: XY1234
                    setValue('invoice_details.type', 'update')
                  }}>
            Save Changes
          </Button>

        </div>
      </div>
    )
  );
}
