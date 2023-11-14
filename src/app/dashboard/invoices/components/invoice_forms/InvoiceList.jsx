import {Label} from "@/@/components/ui/label";
import {Input} from "@/@/components/ui/input";
import {Button} from "@/@/components/ui/button";

export default function InvoiceList({invoiceData, handleChange, setInvoiceData}) {
  const addItem = () => {
    const newItem = {item_name: "", quantity: "", price: "", total: ""};
    setInvoiceData(prevData => ({
      ...prevData,
      itemList: [...prevData.itemList, newItem]
    }));
  };
  const removeItem = (index) => {
    setInvoiceData(prevData => ({
      ...prevData,
      itemList: prevData.itemList.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="item-list-group flex flex-col w-full">
      <Label htmlFor="bill-to"
             className=" text-[#777F98] font-spartan font-bold text-[1.75rem]  mb-[1.5rem] mt-[2rem] gap-[0.625rem]">
        Item List
      </Label>
      <div
        className="item-name-group flex flex-row gap-[1rem] w-full justify-start items-center mb-[1rem]">
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

      {/* map items and display to screen*/}
      <div className="item-row flex flex-col justify-start items-center gap-[1rem]">
        {invoiceData['itemList'].map((item, index) => (
          <div key={index}
               className="item-row flex flex-row justify-start items-center gap-[1rem] w-full">
            <Input className="w-[13.375rem] border-5-secondary"
                   value={item.item_name}
                   onChange={e => handleChange('itemList', 'item_name', e.target.value, index)}
            />
            {/*input, allow numeric values only*/}
            <Input className="w-[3rem] border-5-secondary hide-arrow-input"
                   value={item.quantity}
                   type="number" min="0" max="100" step="1" required="required"
                   pattern="[0-9]*"
                   placeholder="0"
                   onChange={e => handleChange('itemList', 'quantity', e.target.value, index)}
            />

            <Input className="w-[6.25rem] border-5-secondary hide-arrow-input"
                   value={item.price}
                   placeholder="0.00"
                   type="number" min="0" max="100" step="0.01" required="required"
                   onChange={e => handleChange('itemList', 'price', e.target.value, index)}
            />
            <p
              className="w-[3.8125rem]   h-full heading-s-v text-6-muted pl-2 text-right">{(item.quantity * item.price).toLocaleString('en-us', {
              style: 'decimal',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg" onClick={() => removeItem(index)}>
              <path className="hover:cursor-pointer hover:fill-red-500"
                    d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                    fill="#888EB0" fillRule="nonzero"/>
            </svg>
          </div>
        ))}
      </div>

      <Button className="w-full h-[3rem] bg-[#F9FAFE] rounded-[1.5rem] heading-s-v text-7-info hover:cursor-pointer
          hover:bg-5-secondary mt-[1rem]"
              onClick={() => addItem()}
      >
        + Add New Item
      </Button>

    </div>
  );
}
