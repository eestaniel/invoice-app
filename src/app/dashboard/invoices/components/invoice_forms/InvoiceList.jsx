import {Label} from "@/@/components/ui/label";
import {Input} from "@/@/components/ui/input";
import {Button} from "@/@/components/ui/button";
import {useFormContext} from "react-hook-form";

export default function InvoiceList({fields, onAppend, onRemove}) {
  const {register, watch, formState: {errors}} = useFormContext();


  return (
    <div
      className="item-list-group flex flex-col w-full">
      <Label htmlFor="bill-to"
             className=" text-[#777F98] font-spartan font-bold text-[1.75rem]  mb-[1.5rem] lg:mt-[2rem] gap-[0.625rem]">
        Item List
      </Label>


      {/* map items and display to screen*/}
      <div className="hidden lg:inline">
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
          <div className="group flex w-[3.5rem] flex-col gap-[0.625rem] textr">
            <Label htmlFor="to_country" className="body-v text-7-info text-right">Total</Label>
          </div>
        </div>
        <div
          className="item-row flex flex-col justify-start items-center gap-[1rem] mb-4">
          {fields.map((item, index) => {
            const quantity = watch(`item_list.${index}.quantity`);
            const price = watch(`item_list.${index}.price`);
            const total = (parseFloat(quantity) || 0) * (parseFloat(price) || 0);

            return (
              <div key={item.id || index}
                   className={`item-row flex flex-row justify-start items-center gap-[1rem] w-full`}>

                {/* item name */}
                <div className="flex flex-col">
                  <Input
                    {...register(`item_list.${index}.name`)}
                    className={`w-[13.375rem] h-12 border-5-secondary ${errors.item_list?.[index]?.name ? 'border-red-700 ' : ''}}`}
                  />
                </div>


                {/* item quantity */}
                <div className="flex flex-col">
                  <Input
                    {...register(`item_list.${index}.quantity`)}
                    className="w-[3rem] border-5-secondary hide-arrow-input h-12"
                    type="number" min="0" max="100" step="1" required="required"
                    pattern="[0-9]*"
                    placeholder="0"
                  />
                </div>

                {/* item price */}
                <div className="flex flex-col">
                  <Input
                    {...register(`item_list.${index}.price`)}
                    className="w-[6.25rem] border-5-secondary hide-arrow-input h-12"
                    placeholder="0.00"
                    type="number" min="0" step="0.01" required="required"
                  />

                </div>

                {/* item total */}
                <p
                  className="w-[3.8125rem] h-full heading-s-v text-6-muted pl-2 text-right">
                  {total.toFixed(2)}
                </p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" onClick={() => onRemove(index)}>
                  <path className="hover:cursor-pointer hover:fill-red-500"
                        d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                        fill="#888EB0" fillRule="nonzero"/>
                </svg>
              </div>
            )
          })}
        </div>
      </div>
      <div className="lg:hidden">
        <div
          className="item-row flex flex-col justify-start items-center gap-[1rem] mb-4">
          {fields.map((item, index) => {
            const quantity = watch(`item_list.${index}.quantity`);
            const price = watch(`item_list.${index}.price`);
            const total = (parseFloat(quantity) || 0) * (parseFloat(price) || 0);

            return (
              <div key={item.id || index} className={`item-row flex flex-col justify-start items-center gap-[1rem] w-full mb-6`}>
                {/* item name */}
                <div className="flex flex-col w-full">
                  <div className="group flex flex-col w-[13.375rem] gap-[0.625rem]">
                    <Label htmlFor="to_country" className="body-v text-7-info">Item Name</Label>

                  </div>
                  <Input
                    {...register(`item_list.${index}.name`)}
                    className={`border-5-secondary w-full  h-12 ${errors.item_list?.[index]?.name ? 'border-red-700 ' : ''}}`}
                  />
                </div>


                <div className="flex flex-row h-full w-full gap-4">
                  {/* item quantity */}
                  <div className="flex flex-col w-16">
                    <div className="group flex flex-col   gap-[0.625rem]">
                      <Label htmlFor="to_country" className="body-v text-7-info">Qty.</Label>
                    </div>
                    <Input
                      {...register(`item_list.${index}.quantity`)}
                      className="w-full border-5-secondary hide-arrow-input h-12"
                      type="number" min="0" max="100" step="1" required="required"
                      pattern="[0-9]*"
                      placeholder="0"
                    />
                  </div>

                  {/* item price */}
                  <div className="flex flex-col w-[100px]">
                    <div className="group flex g flex-col w-[3.5rem] gap-[0.625rem] mr-[3rem]">
                      <Label htmlFor="to_country" className="body-v text-7-info">Price</Label>

                    </div>
                    <Input
                      {...register(`item_list.${index}.price`)}
                      className="w-full border-5-secondary hide-arrow-input h-12"
                      placeholder="0.00"
                      type="number" min="0" step="0.01" required="required"
                    />

                  </div>

                  {/* item total */}

                  <div className="group flex flex-grow flex-col  h-auto ">
                    <Label htmlFor="to_country" className="body-v text-7-info text-left">Total</Label>
                    <p className=" h-full heading-s-v text-6-muted  flex  items-center">

                      {total.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-grow justify-end items-center pr-2">
                    <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"
                         className=""
                         onClick={() => onRemove(index)}>
                      <path className="hover:cursor-pointer hover:fill-red-500"
                            d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                            fill="#888EB0" fillRule="nonzero"/>
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Button
        className="w-full h-[3rem] bg-[#F9FAFE] rounded-[1.5rem] heading-s-v text-7-info hover:cursor-pointer
          hover:bg-5-secondary mt-[1rem]"
        onClick={(e) => {
          e.preventDefault()
          onAppend({
            item_name: '',
            quantity: '',
            price: '',
            total: '',
          })
        }}
      >
        + Add New Item
      </Button>

    </div>
  );
}
