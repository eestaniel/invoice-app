"use client"
import { useState } from "react";
import { Input } from "@/@/components/ui/input"
import { Label } from "@/@/components/ui/label"
import { Button} from "@/@/components/ui/button";


export default function SheetView() {
  return (
    <div className="p-[3.5rem]">
      <h1 className="heading-m">New Invoice</h1>

      {/* Bill From*/}
      {/*Street address-input
      group: city-input, post code-input, country-input*/}
      <div className="bill-from-group flex flex-col">
        <Label htmlFor="bill-from" className="heading-s-v text-1-primary mb-[1.5rem] mt-[4.875rem]">Bill From</Label>
        <Label htmlFor="street_address" className="body-v text-6-muted">Street Address</Label>
        <Input id="bill-from" placeholder="Street Address" className="w-full mb-[1.5rem]"/>
        <div className="bill-from-group__group2 flex flex-row justify-between w-full gap-[1.5rem]">
          <Input placeholder="City" className="w-[50%]"/>
          <Input placeholder="Post Code" className="w-[50%]"/>
        </div>
        <Input placeholder="Country" className="w-full"/>
      </div>
    </div>
  );
}
