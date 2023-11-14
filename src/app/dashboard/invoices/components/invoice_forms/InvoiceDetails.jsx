import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";
import {Popover, PopoverContent, PopoverTrigger} from "@/@/components/ui/popover";
import {Button} from "@/@/components/ui/button";
import {Calendar} from "@/@/components/ui/calendar";
import {format} from "date-fns";
import {useRef, useState} from "react";

export default function InvoiceDetails({invoiceData, handleChange, formRef}) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTermsPopoverOpen, setIsTermsPopoverOpen] = useState(false);


  const focusForm = () => {
    if (formRef.current) {
      formRef.current.focus(); // Brings the form into focus
    }
  };

  return (
    <div className="bill-to-group flex flex-col gap-[1.5rem] mb-[1.5rem] mt-[3rem]">
      <div className="invoice-date-term-group flex flex-row gap-[1.5rem]">
        <div className="group flex flex-col h-full w-full gap-[0.625rem] relative ">
          <Label htmlFor="invoice_date" className="body-v text-7-info">Invoice Date</Label>
          <Popover isOpen={isPopoverOpen} onOpen={() => setIsPopoverOpen(true)}
                   onClose={() => setIsPopoverOpen(false)}>
            <PopoverTrigger asChild>
              <Button variant={"outline"}
                      className={("w-full justify-start text-left heading-s-v opacity-50 group-hover:cursor-pointer group-hover:border-1-primary group-hover:opacity-100")}>
                {selectedDate && !isNaN(selectedDate.getTime())
                  ? format(selectedDate, "dd MMM yyyy")
                  : <span>Pick a date</span>
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    handleChange('invoiceDetails', 'invoiceDate', format(date, "dd MMM yyyy"));
                  }
                  setIsPopoverOpen(false);
                  focusForm()
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* payment Terms*/}
        <div className="group flex flex-col w-full gap-[0.625rem] relative">
          <Label htmlFor="payment_terms" className="body-v text-7-info">Payment Terms</Label>
          <Popover isOpen={isTermsPopoverOpen} onOpen={() => setIsTermsPopoverOpen(true)}
                   onClose={() => setIsTermsPopoverOpen(false)}>
            <PopoverTrigger asChild>
              <div className="flex justify-between items-center hover:cursor-pointer group">
                <Input
                  id="payment_terms"
                  className="w-full heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary group-hover:border-1-primary group-hover:opacity-100
                                            group-hover:cursor-pointer"
                  value={invoiceData.invoiceDetails.paymentTerms}
                  // onclick set oposite value of isTermsPopoverOpen
                  onClick={() => setIsTermsPopoverOpen(!isTermsPopoverOpen)}
                  onChange={e => handleChange('invoiceDetails', 'paymentTerms', e.target.value)}
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
                    handleChange('invoiceDetails', 'paymentTerms', 'Net 1 Day');
                    setIsTermsPopoverOpen(!isTermsPopoverOpen)
                    focusForm()
                  }}
                >Net 1 Day
                </p>
                <hr/>
              </div>
              <div className="w-full group">
                <p
                  className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                  onClick={() => handleChange('invoiceDetails', 'paymentTerms', 'Net 7 Day')}
                >Net 7 Day</p>
                <hr/>
              </div>
              <div className="w-full group">
                <p
                  className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                  onClick={() => handleChange('invoiceDetails', 'paymentTerms', 'Net 14 Day')}
                >Net 14 Day</p>
                <hr/>
              </div>
              <div className="w-full group">
                <p
                  className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                  onClick={() => handleChange('invoiceDetails', 'paymentTerms', 'Net 30 Day')}
                >Net 30 Day</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

      </div>
      <div className="group flex flex-col w-full gap-[0.625rem]">
        <Label htmlFor="to_country" className="body-v text-7-info">Project Description</Label>
        <Input className="w-full  border-5-secondary heading-s-v text-8-text"
               placeholder="e.g Graphic Design Service"
               value={invoiceData.invoiceDetails.projectDescription}
               onChange={e => handleChange('invoiceDetails', 'projectDescription', e.target.value)}
        />
      </div>
    </div>
  );
}
