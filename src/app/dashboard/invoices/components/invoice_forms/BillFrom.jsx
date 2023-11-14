import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";
import {useFormContext} from "react-hook-form";
import {useState, useEffect} from "react";


export default function BillFrom({invoiceData, handleChange}) {
  const {register, formState: {errors}} = useFormContext();
  const [tempErrorStorage, setTempErrorStorage] = useState('');


  return (
    <div className="bill-from-group flex flex-col">
      <Label htmlFor="bill-from" className="heading-s-v text-1-primary mb-[1.5rem] mt-[3rem]">Bill From</Label>
      <div className="group flex flex-col w-full gap-[0.625rem]">
        <Label htmlFor="from_address" className="body-v text-7-info">Street Address</Label>
        <Input
          {...register('billFrom.address')}
          className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0
          ${errors.billFrom?.address ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'}
          `}
        />
        {errors.billFrom?.address && <span className="text-red-600 mb-4">{errors.billFrom?.address?.message}</span>}

      </div>
      <div className="bill-from-group__group2 flex flex-row justify-between w-full gap-[1.5rem]">
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="from_city" className="body-v text-7-info">City</Label>
          <Input
            {...register('billFrom.city')}
            className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0
          ${errors.billFrom?.city ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'}
          `}
          />
          {errors.billFrom?.city && <span className="text-red-600 mb-4">{errors.billFrom?.city?.message}</span>}
        </div>
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="from_post_code" className="body-v text-7-info">Post Code</Label>
          <Input
            {...register('billFrom.post_code')}
            className={
              `w-full border-5-secondary focus:border-1-primary focus:outline-none focus:ring-0
              ${errors.billFrom?.post_code ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'}
            `}
          />
          {errors.billFrom?.post_code && <span className="text-red-600 mb-4">Invalid Post Code</span>}
        </div>
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="from_country" className="body-v text-7-info">Country</Label>
          <Input
            {...register('billFrom.country')}
            className={
              `w-full border-5-secondary focus:border-1-primary focus:outline-none focus:ring-0
              ${errors.billFrom?.country ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'}
          `}
          />
          {errors.billFrom?.country && <span className="text-red-600 mb-4">{errors.billFrom?.country?.message}</span>}
        </div>
      </div>
    </div>
  );
}
