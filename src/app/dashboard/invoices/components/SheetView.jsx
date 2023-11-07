"use client"
import {useState, useEffect} from "react";
import {Input} from "@/@/components/ui/input"
import {Label} from "@/@/components/ui/label"
import {Button} from "@/@/components/ui/button";
import Image from "next/image";


export default function SheetView() {
  const [todayDate, setTodaydate] = useState(new Date());

  useEffect(() => {
    /* get todays date dd/mon/yyyy*/
    /*first three letters of month*/
    const today = new Date();
    const dd = today.getDate();
    const mm = today.toLocaleString('default', {month: 'short'});
    const yyyy = today.getFullYear();

    setTodaydate(`${dd} ${mm} ${yyyy}`);
    console.log(todayDate)

  }, [todayDate])

  return (
    <>
      {/* Bill from group */}
      <div className="pl-[10.5rem] pr-[3.5rem] w-full] overflow-hidden">
        <h1 className="heading-m">New Invoice</h1>

        {/* Bill From*/}
        {/*Street address-input
      group: city-input, post code-input, country-input*/}
        <div className="bill-from-group flex flex-col">
          <Label htmlFor="bill-from" className="heading-s-v text-1-primary mb-[1.5rem] mt-[4.875rem]">Bill From</Label>

          <div className="group flex flex-col w-full gap-[0.625rem]">
            <Label htmlFor="to_street_address" className="body-v text-7-info">Street Address</Label>
            <Input id="from_address" className="w-full mb-[1.5rem] border-5-secondary"/>
          </div>


          <div className="bill-from-group__group2 flex flex-row justify-between w-full gap-[1.5rem]">
            <div className="group flex flex-col w-full gap-[0.625rem]">
              <Label htmlFor="from_city" className="body-v text-7-info">City</Label>
              <Input className="w-full border-5-secondary"/>
            </div>
            <div className="group flex flex-col w-full gap-[0.625rem]">
              <Label htmlFor="from_post_code" className="body-v text-7-info">Post Code</Label>
              <Input className="w-full border-5-secondary"/>
            </div>
            <div className="group flex flex-col w-full gap-[0.625rem]">
              <Label htmlFor="from_country" className="body-v text-7-info">Country</Label>
              <Input className="w-full border-5-secondary"/>
            </div>
          </div>
        </div>

        {/* Bill to*/}
        <div className="bill-to-group flex flex-col">
          <Label htmlFor="bill-to" className="heading-s-v text-1-primary mb-[1.5rem] mt-[4.875rem] gap-[0.625rem]">
            BillTo
          </Label>
          <div className="group flex flex-col w-full gap-[0.625rem]">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Label htmlFor="street_address" className="body-v text-7-info">Client's Name</Label>
            <Input id="bill-from" className="w-full mb-[1.5rem] border-5-secondary"/>
          </div>
          <div className="bill-from-group__group3 flex flex-col justify-between w-full gap-[1.5rem]">
            <div className="group flex flex-col w-full gap-[0.625rem]">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Label htmlFor="to_city" className="body-v text-7-info">Client's Email</Label>
              <Input className="w-full border-5-secondary"/>
            </div>
            <div className="group flex flex-col w-full gap-[0.625rem]">
              <Label htmlFor="to_address" className="body-v text-7-info">Street Address</Label>
              <Input className="w-full border-5-secondary"/>
            </div>
            <div className="bill-to-group__group3 flex flex-row justify-between w-full gap-[1.5rem]">
              <div className="group flex flex-col w-full gap-[0.625rem]">
                <Label htmlFor="to_city" className="body-v text-7-info">City</Label>
                <Input className="w-full border-5-secondary"/>
              </div>
              <div className="group flex flex-col w-full gap-[0.625rem]">
                <Label htmlFor="to_post_code" className="body-v text-7-info">Post Code</Label>
                <Input className="w-full border-5-secondary"/>
              </div>
              <div className="group flex flex-col w-full gap-[0.625rem]">
                <Label htmlFor="to_country" className="body-v text-7-info">Country</Label>
                <Input className="w-full  border-5-secondary "/>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="bill-to-group flex flex-col gap-[1.5rem] mb-[1.5rem] mt-[3rem]">
          <div className="invoice-date-term-group flex flex-row gap-[1.5rem]">
            <div className="group flex flex-col w-full gap-[0.625rem] relative">
              <Label htmlFor="to_country" className="body-v text-7-info">Invoice Date</Label>
              <Input className="w-full heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary"/>
              <div
                className="data-group flex flex-row justify-between pl-[1.25rem] pr-[1rem] absolute h-full top-[60%] gap-[5rem]">
                <p className="heading-s-v opacity-50 ">{todayDate.toString()}</p>
                <svg className=""
                     width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 2h-.667V.667A.667.667 0 0012.667 0H12a.667.667 0 00-.667.667V2H4.667V.667A.667.667 0 004 0h-.667a.667.667 0 00-.666.667V2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm.667 12c0 .367-.3.667-.667.667H2A.668.668 0 011.333 14V6.693h13.334V14z"
                    fill="#7E88C3" fillRule="nonzero" opacity=".5"/>
                </svg>
              </div>
            </div>
            <div className="group flex flex-col w-full gap-[0.625rem] relative">
              <Label htmlFor="to_country" className="body-v text-7-info">Payment Terms</Label>
              <Input className="w-full heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary"/>
              <div
                className="data-group flex flex-row justify-between pl-[1.25rem] pr-[1rem] absolute h-full top-[60%] gap-[5rem]">
                <p className="heading-s-v ">Net 30 Days</p>
                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 10">
                  <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
          <div className="group flex flex-col w-full gap-[0.625rem]">
            <Label htmlFor="to_country" className="body-v text-7-info">Project Description</Label>
            <Input className="w-full  border-5-secondary heading-s-v text-8-text"
                   placeHolder="e.g Graphic Design Service"/>
          </div>
        </div>

        {/* Invoice Item List */}
        <div className="item-list-group flex flex-col w-full">
          <Label htmlFor="bill-to"
                 className=" text-[#777F98] font-spartan font-bold text-[1.75rem]  mb-[1.5rem] mt-[2rem] gap-[0.625rem]">
            Item List
          </Label>
          <div className="item-name-group flex flex-row gap-[1rem] w-full justify-start items-center mb-[1rem]">
            <div className="group flex flex-col w-[13.375rem] gap-[0.625rem]">
              <Label htmlFor="to_country" className="body-v text-7-info">Item Name</Label>

            </div>
            <div className="group flex flex-col w-[3rem]  gap-[0.625rem]">
              <Label htmlFor="to_country" className="body-v text-7-info">Qty.</Label>

            </div>
            <div className="group flex g flex-col w-[3.5rem] gap-[0.625rem] mr-[3rem]">
              <Label htmlFor="to_country" className="body-v text-7-info">Price</Label>

            </div>
            <div className="group flex w-[3.5rem] flex-col gap-[0.625rem]">
              <Label htmlFor="to_country" className="body-v text-7-info">Total</Label>
            </div>

          </div>

          <Button className="w-full h-[3rem] bg-[#F9FAFE] rounded-[1.5rem] heading-s-v text-7-info hover:cursor-pointer
          hover:bg-5-secondary ">
            + Add New Item
          </Button>

          <div className="group-buttons flex flex-row justify-between gap-[0.5rem] mt-[3rem]">
            <Button className="w-[6rem] h-[3rem] rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v">Discard</Button>
            <div className="groupbuttons flex flex-row gap-[0.5rem]">
              <Button className="w-[8.25rem] h-[3rem] rounded-[1.5rem] bg-[#373B53] heading-s-v text-6-muted ">Save as Draft</Button>
              <Button className="w-[8rem] h-[3rem] rounded-[1.5rem] bg-1-primary text-white" >Save & Send</Button>
            </div>
          </div>

          {/*          <div className="item-row flex flex-row justify-start items-center gap-[1rem]">
            <Input className="w-[13.375rem]  border-5-secondary"/>
            <Input className="w-[3rem]  border-5-secondary"/>
            <Input className="w-[6.255rem]  border-5-secondary"/>
            <Input className="w-[3.5rem]  border-5-secondary"/>
             eslint-disable-next-line @next/next/no-img-element
            <img src="/delete.png" alt="delete icon" className="w-[1rem] h-[1rem]"/>
          </div>*/}
        </div>

      </div>

    </>

    /* Bill to group */

  );
}
