import {Input} from "@/@/components/ui/input";
import {Label} from "@/@/components/ui/label";
import {useFormContext} from "react-hook-form";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext} from "react";

export default function BillTo() {
  const {register, formState: {errors}} = useFormContext();
  const {theme} = useContext(InvoiceContext);

  return (
    <div className="bill-to-group flex flex-col">
      <Label htmlFor="bill-to"
             className="heading-s-v text-1-primary mb-[1.5rem] mt-10 lg:mt-[3rem] gap-[0.625rem]">
        BillTo
      </Label>

      {/* Client's Name */}
      <div className="group flex flex-col w-full gap-[0.625rem]">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Label htmlFor="street_address" className={`${theme.sheet_label}`}>Client's Name</Label>
        <Input
          {...register('bill_to.client_name')}
          className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0 h-12
          ${theme.sheet_input}
          ${errors.bill_to?.client_name ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'} 
          `}
        />
        {errors.bill_to?.client_name &&
          <span className="text-red-600 mb-4">{errors.bill_to?.client_name?.message}</span>}
      </div>

      {/* Client's Email*/}
      <div className="bill-from-group__group3 flex flex-col justify-between w-full gap-[1.5rem]">
        <div className="group flex flex-col w-full gap-[0.625rem]">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Label htmlFor="to_city" className={`${theme.sheet_label}`}>Client's Email</Label>
          <Input
            {...register('bill_to.client_email')}
            className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0 h-12
          ${theme.sheet_input}
          ${errors.bill_to?.client_email ? 'border-red-600 mb-[-0.75rem]' : ''} 
          `}
          />
          {errors.bill_to?.client_email &&
            <span className="text-red-600 mb-4">{errors.bill_to?.client_email?.message}</span>}
        </div>

        {/* Street Address */}
        <div className="group flex flex-col w-full gap-[0.625rem]">
          <Label htmlFor="to_address" className={`${theme.sheet_label}`}>Street Address</Label>
          <Input
            {...register('bill_to.street_address')}
            className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0 h-12
          ${theme.sheet_input}
          ${errors.bill_to?.street_address ? 'border-red-600 mb-[-0.75rem]' : ''} 
          `}
          />
          {errors.bill_to?.street_address &&
            <span className="text-red-600 mb-4">{errors.bill_to?.street_address?.message}</span>}
        </div>

        {/* City, Post Code, Country group*/}
        <div className="bill-to-group__group3 flex flex-row justify-between w-full flex-wrap lg:flex-nowrap lg:gap-4">

          {/* City */}
          <div className="group flex flex-col gap-[0.625rem] grow max-w-[48%] lg:max-w-[33%] flex-nowrap">
            <Label htmlFor="to_city" className={`${theme.sheet_label}`}>City</Label>
            <Input
              {...register('bill_to.city')}
              className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0 h-12
          ${theme.sheet_input}
          ${errors.bill_to?.city ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'} 
          `}
            />
            {errors.bill_to?.city &&
              <span className="text-red-600 mb-4">{errors.bill_to?.city?.message}</span>}
          </div>

          {/* Post Code */}
          <div className="group flex flex-col gap-[0.625rem] grow max-w-[48%] lg:max-w-[33%] flex-nowrap">
            <Label htmlFor="to_post_code" className={`${theme.sheet_label}`}>Post Code</Label>
            <Input
              {...register('bill_to.post_code')}
              className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0 h-12
          ${theme.sheet_input}
          ${errors.bill_to?.post_code ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'} 
          `}
            />
            {errors.bill_to?.post_code &&
              <span className="text-red-600 mb-4">Invalid Post Code</span>}
          </div>

          {/* Country */}
          <div className="group flex flex-col gap-[0.625rem] grow lg:max-w-[33%]">
            <Label htmlFor="to_country" className={`${theme.sheet_label}`}>Country</Label>
            <Input
              {...register('bill_to.country')}
              className={`
          w-full border-5-secondary 
          focus:border-1-primary focus:outline-none focus:ring-0 h-12
          ${theme.sheet_input}
          ${errors.bill_to?.country ? 'border-red-600 mb-[-0.75rem]' : 'mb-6'} 
          `}
            />
            {errors.bill_to?.country &&
              <span className="text-red-600 mb-4">{errors.bill_to?.country?.message}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
