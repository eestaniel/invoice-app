import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/@/components/ui/popover";
import {Button} from "@/@/components/ui/button";
import {Calendar} from "@/@/components/ui/calendar";
import {format} from "date-fns";
import {useState} from "react";
import {useFormContext} from "react-hook-form";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext} from "react";

export default function InvoiceDetails() {
  const [isTermsPopoverOpen, setIsTermsPopoverOpen] = useState(false);
  const [callback, setCallback] = useState(false);
  const {theme} = useContext(InvoiceContext);

  const {register, getValues, setValue, formState: {errors}} = useFormContext();
  const formValues = getValues().invoice_details;


  return (
    <div className="bill-to-group flex flex-row mb-[1.5rem] mt-[2rem] w-full h-fit flex-wrap gap-2 justify-between">

      {/* Invoice Date */}
      <div className="invoice-date-term-group flex flex-row h-fit grow max-w-[100%] md:max-w-[48%] ">
        <div className="group flex flex-col h-full gap-[0.625rem] relative w-full">
          <Label htmlFor="invoice_date" className={`${theme.sheet_label}`}>Invoice Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`w-full h-12 justify-between text-left heading-s-v opacity-50 group-hover:cursor-pointer group-hover:border-1-primary group-hover:opacity-100
                ${theme.sheet_input}`}>
                {formValues.invoice_date && format(formValues.invoice_date, 'd MMM yyyy')}
                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path className="group group-hover:fill-1-primary"
                    d="M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.693h13.334V14z"
                    fill="#7E88C3" fillRule="nonzero" opacity=".5"/>
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formValues.invoice_date}
                onSelect={(date) => {
                  setValue('invoice_details.invoice_date', new Date(date));
                  setCallback(!callback);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* payment Terms*/}
      <div className="group flex flex-col gap-[0.625rem] relative flex-wrap lg:flex-nowrap grow max-w-[100%] md:max-w-[48%]">
        <Label htmlFor="payment_terms" className={`${theme.sheet_label}`}>Payment Terms</Label>
        <Popover isOpen={isTermsPopoverOpen} onOpenChange={setIsTermsPopoverOpen}>
          <PopoverTrigger asChild>
            <div className="flex justify-between items-center hover:cursor-pointer group">
              <Input
                {...register('invoice_details.payment_terms')}
                className={`w-full h-12 heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary group-hover:border-1-primary group-hover:opacity-100
                  group-hover:cursor-pointer ${theme.sheet_input}`}
              />
              <div className="svg absolute right-4">
                {isTermsPopoverOpen ? (
                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 6.22803L5.2279 2.00013L9.4558 6.22803" stroke="#7C5DFA"
                          strokeWidth="2" fill="none"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 15 10">
                    <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2"
                          fill="none" fillRule="evenodd"/>
                  </svg>
                )}
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[15rem] p-0 ">
            {/* Popover content */}
            <div className="w-full group">
              <p
                className="heading-s-v text-8-text w-full pl-6 py-4 group-hover:cursor-pointer group-hover:text-1-primary"
                onClick={() => {
                  setValue('invoice_details.payment_terms', 'Net 1 Day');
                }}
              >Net 1 Day
              </p>
              <hr/>
            </div>
            <div className="w-full group">
              <p
                className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                onClick={() => {
                  setValue('invoice_details.payment_terms', 'Net 7 Day');
                }}
              >Net 7 Day</p>
              <hr/>
            </div>
            <div className="w-full group">
              <p
                className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                onClick={() => {
                  setValue('invoice_details.payment_terms', 'Net 14 Day');
                }}
              >Net 14 Day</p>
              <hr/>
            </div>
            <div className="w-full group">
              <p
                className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                onClick={() => {
                  setValue('invoice_details.payment_terms', 'Net 30 Day');
                }}
              >Net 30 Day</p>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Project Description */}
      <div className="group flex flex-col flex-wrap gap-[0.625rem] w-full mt-4">
        <Label htmlFor="to_country" className={`${theme.sheet_label}`}>Project Description</Label>
        <Input
          {...register('invoice_details.project_description')}
          className={`
          w-full border-5-secondary  h-12
          focus:border-1-primary focus:outline-none focus:ring-0
          ${theme.sheet_input}
          ${errors.invoice_details?.project_description ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'} 
          `}
        />
        {errors.invoice_details?.project_description &&
          <span className="text-red-600 mb-4">{errors.invoice_details?.project_description?.message}</span>}

      </div>
    </div>
  );
}
