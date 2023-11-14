import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";

export default function BillTo({invoiceData, handleChange}) {
  return (
    <div className="bill-to-group flex flex-col">
      <Label htmlFor="bill-to"
             className="heading-s-v text-1-primary mb-[1.5rem] mt-[3rem] gap-[0.625rem]">
        BillTo
      </Label>
      <div className="group flex flex-col w-full gap-[0.625rem]">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Label htmlFor="street_address" className="body-v text-7-info">Client's Name</Label>
        <Input id="bill-from"
               className="w-full mb-[1.5rem] border-5-secondary"
               value={invoiceData.billTo.clientName}
               onChange={e => handleChange('billTo', 'clientName', e.target.value)}
        />
      </div>
      <div className="bill-from-group__group3 flex flex-col justify-between w-full gap-[1.5rem]">
        <div className="group flex flex-col w-full gap-[0.625rem]">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Label htmlFor="to_city" className="body-v text-7-info">Client's Email</Label>
          <Input className="w-full border-5-secondary"
                 value={invoiceData.billTo.clientEmail}
                 onChange={e => handleChange('billTo', 'clientEmail', e.target.value)}
          />
        </div>
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="to_address" className="body-v text-7-info">Street Address</Label>
          <Input className="w-full border-5-secondary"
                 value={invoiceData.billTo.address}
                 onChange={e => handleChange('billTo', 'address', e.target.value)}
          />
        </div>
        <div className="bill-to-group__group3 flex flex-row justify-between w-full gap-[1.5rem]">
          <div className="group flex flex-col w-full gap-[0.625rem]">
            <Label htmlFor="to_city" className="body-v text-7-info">City</Label>
            <Input className="w-full border-5-secondary"
                   value={invoiceData.billTo.city}
                   onChange={e => handleChange('billTo', 'city', e.target.value)}
            />
          </div>
          <div className="group flex flex-col w-full gap-[0.625rem]">
            <Label htmlFor="to_post_code" className="body-v text-7-info">Post Code</Label>
            <Input className="w-full border-5-secondary"
                   value={invoiceData.billTo.post_code}
                   onChange={e => handleChange('billTo', 'post_code', e.target.value)}
            />
          </div>
          <div className="group flex flex-col w-full gap-[0.625rem]">
            <Label htmlFor="to_country" className="body-v text-7-info">Country</Label>
            <Input className="w-full  border-5-secondary "
                   value={invoiceData.billTo.country}
                   onChange={e => handleChange('billTo', 'country', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
