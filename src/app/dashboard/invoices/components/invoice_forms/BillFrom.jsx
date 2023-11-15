import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";
import {useFormContext} from "react-hook-form";

export default function BillFrom() {
  const {register, formState: {errors}} = useFormContext();


  return (
    <div className="bill-from-group flex flex-col">
      {/* Street Address */}
      <Label htmlFor="bill-from" className="heading-s-v text-1-primary mb-[1.5rem] mt-[1.5rem]">Bill From</Label>
      <div className="group flex flex-col w-full gap-[0.625rem] ">
        <Label htmlFor="from_address" className="body-v text-7-info">Street Address</Label>
        <Input
          {...register('bill_from.street_address')}
          className={`
          w-full border-5-secondary h-12
          focus:border-1-primary focus:outline-none focus:ring-0
          ${errors.bill_from?.street_address ? 'border-red-600 mb-[-0.75rem] whitespace-nowrap' : 'mb-6'}
          `}
        />
        {errors.bill_from?.street_address &&
          <span className="text-red-600 ">{errors.bill_from?.street_address?.message}</span>}
      </div>

      {/* City, Post Code, Country group*/}
      <div className="bill-from-group__group2 flex flex-row justify-between w-full flex-wrap lg:flex-nowrap lg:gap-4">

        {/* City */}
        <div className="group flex flex-col max-w-[48%] lg:max-w-[33%] grow gap-[0.625rem]">
          <Label htmlFor="from_city" className="body-v text-7-info">City</Label>
          <Input
            {...register('bill_from.city')}
            className={`
          w-full border-5-secondary h-12
          focus:border-1-primary focus:outline-none focus:ring-0
          ${errors.bill_from?.city ? 'border-red-600 mb-[-0.75rem] ' : ''}
          `}
          />
          {errors.bill_from?.city &&
            <span className="text-red-600 whitespace-nowrap">{errors.bill_from?.city?.message}</span>}
        </div>

        {/* Post Code */}
        <div className="group flex flex-col max-w-[48%] lg:max-w-[33%] grow gap-[0.625rem] flex-nowrap">
          <Label htmlFor="from_post_code" className="body-v text-7-info">Post Code</Label>
          <Input
            {...register('bill_from.post_code')}
            className={
              `w-full border-5-secondary focus:border-1-primary focus:outline-none focus:ring-0 h-12
              ${errors.bill_from?.post_code ? 'border-red-600 mb-[-0.75rem]' : ''}
            `}
          />
          {errors.bill_from?.post_code && <span className="text-red-600 whitespace-nowrap">Invalid Post Code</span>}
        </div>

        {/* Country */}
        <div className="group flex flex-col  lg:max-w-[33%] grow gap-[0.625rem] h-full flex-wrap mt-4 lg:mt-0">
          <Label htmlFor="from_country" className="body-v text-7-info">Country</Label>
          <Input
            {...register('bill_from.country')}
            className={
              ` border-5-secondary focus:border-1-primary focus:outline-none focus:ring-0 h-12 
              flex-wrap lg:flex-nowrap grow
              ${errors.bill_from?.country ? 'border-red-600 mb-[-0.75rem]' : ''}
          `}
          />
          {errors.bill_from?.country &&
            <span className="text-red-600 whitespace-nowrap">{errors.bill_from?.country?.message}</span>}
        </div>
      </div>
    </div>
  );
}
