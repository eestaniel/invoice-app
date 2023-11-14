import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";

export default function BillFrom({invoiceData, handleChange}) {
  return (
    <div className="bill-from-group flex flex-col">
      <Label htmlFor="bill-from" className="heading-s-v text-1-primary mb-[1.5rem] mt-[3rem]">Bill From</Label>
      <div className="group flex flex-col w-full gap-[0.625rem]">
        <Label htmlFor="from_address" className="body-v text-7-info">Street Address</Label>
        <Input
          id="from_address"
          className="w-full mb-[1.5rem] border-5-secondary"
          value={invoiceData.billFrom.address}
          onChange={(e) => handleChange('billFrom', 'address', e.target.value)}
        />
      </div>
      <div className="bill-from-group__group2 flex flex-row justify-between w-full gap-[1.5rem]">
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="from_city" className="body-v text-7-info">City</Label>
          <Input className="w-full border-5-secondary"
                 value={invoiceData.billFrom.city}
                 onChange={e => handleChange('billFrom', 'city', e.target.value)}
          />
        </div>
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="from_post_code" className="body-v text-7-info">Post Code</Label>
          <Input className="w-full border-5-secondary"
                 value={invoiceData.billFrom.post_code}
                 onChange={e => handleChange('billFrom', 'post_code', e.target.value)}
          />
        </div>
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="from_country" className="body-v text-7-info">Country</Label>
          <Input className="w-full border-5-secondary"
                 value={invoiceData.billFrom.country}
                 onChange={e => handleChange('billFrom', 'country', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
