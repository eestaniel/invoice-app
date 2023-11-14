import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/@/components/ui/popover";
import {Button} from "@/@/components/ui/button";
import {Calendar} from "@/@/components/ui/calendar";
import {format} from "date-fns";
import {useState} from "react";
import {useFormContext} from "react-hook-form";

export default function InvoiceDetails() {
  const [isTermsPopoverOpen, setIsTermsPopoverOpen] = useState(false);
  const [callback, setCallback] = useState(false);

  const {register, getValues, setValue, formState: {errors}} = useFormContext();
  const formValues = getValues().invoice_details;



  return (
    <div className="bill-to-group flex flex-col gap-[1.5rem] mb-[1.5rem] mt-[3rem]">
      <div className="invoice-date-term-group flex flex-row gap-[1.5rem]">
        <div className="group flex flex-col h-full w-full gap-[0.625rem] relative ">
          <Label htmlFor="invoice_date" className="body-v text-7-info">Invoice Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                      className={("w-full justify-start text-left heading-s-v opacity-50 group-hover:cursor-pointer group-hover:border-1-primary group-hover:opacity-100")}>
                {formValues.invoice_date && format(formValues.invoice_date, 'd MMM yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                {...register('invoice_details.invoice_date')}
                mode="single"
                selected={formValues.invoice_date}
                onSelect={(date) => {
                  setValue('invoice_details.invoice_date', date);
                  setCallback(!callback);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* payment Terms*/}
        <div className="group flex flex-col w-full gap-[0.625rem] relative">
          <Label htmlFor="payment_terms" className="body-v text-7-info">Payment Terms</Label>
          <Popover isOpen={isTermsPopoverOpen} onOpenChange={setIsTermsPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="flex justify-between items-center hover:cursor-pointer group">
                <Input
                  {...register('invoice_details.payment_terms')}
                  className="w-full heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary group-hover:border-1-primary group-hover:opacity-100
                                            group-hover:cursor-pointer"
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

      </div>
      <div className="group flex flex-col w-full gap-[0.625rem]">
        <Label htmlFor="to_country" className="body-v text-7-info">Project Description</Label>
        <Input
          {...register('invoice_details.project_description')}
          className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0
          ${errors.invoice_details?.project_description ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'} 
          `}
        />
        {errors.invoice_details?.project_description &&
          <span className="text-red-600 mb-4">{errors.invoice_details?.project_description?.message}</span>}

      </div>
    </div>
  );
}
