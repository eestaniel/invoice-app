import {SheetClose} from "@/@/components/ui/sheet";
import {Button} from "@/@/components/ui/button";
import React from "react";
import {useFormContext} from "react-hook-form";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext} from "react";
import {AuthContext} from "@/app/dashboard/context/AuthContext";


export default function CreateButtons() {
  const {register, setValue, getValues} = useFormContext();
  const {theme} = useContext(InvoiceContext);

  const {currentUser} = useContext(AuthContext);

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

  const setCustomId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = letters[Math.floor(Math.random() * letters.length)] + letters[Math.floor(Math.random() * letters.length)];
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setValue('invoice_details.custom_id', randomLetters + randomDigits);
  }

  return (
    <div
      className={` group-buttons flex flex-row justify-between items-center gap-[0.5rem] mt-[3rem] w-full h-full 
        grow p-[3.5rem] shadow-[rgba(0,0,0,0.1)_1px_4px_100px_30px] ${theme.sheet_bg}`}>
      <SheetClose asChild>
        <Button
          className="w-[84px] lg:w-[6rem] h-[3rem] rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v stick hover:bg-9-accent hover:text-8-text">
          Discard
        </Button>
      </SheetClose>
      <div className="groupbuttons flex flex-row gap-[0.5rem]">
        <Button
          {...register('invoice_details.status')}

          className="w-[117px] lg:w-[8.25rem] h-[3rem] rounded-[1.5rem] bg-[#373B53] heading-s-v text-6-muted hover:cursor-pointer hover:bg-8-text"
          type="submit"
          onClick={() => {
            // set status pending
            setValue('invoice_details.status', 'draft')
            // calculate and set due date
            setDueDate()
            // calculate and set total
            setTotal()
            // generate and set custom_id: random 2 letters + 4 digits: XY1234
            setCustomId()
            // set post request type to create
            setValue('invoice_details.type', 'create')
            // set client uid
            setValue('invoice_details.uid', currentUser.uid)

          }}>
          Save as Draft
        </Button>

        <Button
          {...register('invoice_details.status')}
          onClick={() => {
            // set status pending
            setValue('invoice_details.status', 'pending')
            // calculate and set due date
            setDueDate()
            // calculate and set total
            setTotal()
            // generate and set custom_id: random 2 letters + 4 digits: XY1234
            setCustomId()
            // set post request type to create
            setValue('invoice_details.type', 'create')
            // set client uid
            setValue('invoice_details.uid', currentUser.uid)


          }}
          className="w-[112px] lg:w-[8rem] h-[3rem] rounded-[1.5rem] bg-1-primary heading-s-v text-white hover:cursor-pointer hover:bg-2-highlight"
          type="submit"
        >
          Save & Send
        </Button>


      </div>
    </div>
  );
}
