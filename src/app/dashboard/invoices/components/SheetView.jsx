"use client"
import {useState, useEffect} from "react";
import {Input} from "@/@/components/ui/input"
import {Label} from "@/@/components/ui/label"
import {Button} from "@/@/components/ui/button";


export default function SheetView({setSheetOpen}) {
    const [invoiceData, setInvoiceData] = useState({
        billFrom: {
            address: '',
            city: '',
            postCode: '',
            country: ''
        },
        billTo: {
            clientName: '',
            clientEmail: '',
            address: '',
            city: '',
            postCode: '',
            country: ''
        },
        invoiceDetails: {
            invoiceDate: new Date(),
            paymentTerms: 'Net 30 Days',
            projectDescription: ''
        },
        itemList: []

    });

    const addItem = () => {
        const newItem = {name: "", quantity: "", price: "", total: ""};
        setInvoiceData({
            ...invoiceData,
            itemList: [...invoiceData.itemList, newItem]
        });
    };


    const removeItem = (index) => {
        const filteredItems = invoiceData.itemList.filter((item, i) => i !== index);
        setInvoiceData({
            ...invoiceData,
            itemList: filteredItems
        });
    };

    const handleItemChange = (e, index, field) => {
        const newItems = [...invoiceData.itemList];
        newItems[index] = {
            ...newItems[index],
            [field]: e.target.value
        };

        setInvoiceData({
            ...invoiceData,
            itemList: newItems
        });
    };


    const printItems = () => {
        console.log(invoiceData)
    }


    useEffect(() => {
        /* get todays date dd/mon/yyyy*/
        /*first three letters of month*/
        const today = new Date();
        const dd = today.getDate();
        const mm = today.toLocaleString('default', {month: 'short'});
        const yyyy = today.getFullYear();

        /*const todayDate = `${dd} ${mm} ${yyyy}`;*/
        setInvoiceData({
            ...invoiceData,
            invoiceDetails: {
                ...invoiceData.invoiceDetails,
                invoiceDate: `${dd} ${mm} ${yyyy}`
            }
        })

    }, [])

    return (
        <>
            {/* Bill from group */}
            <div className="pl-[10.5rem] pr-[3.5rem] w-full] overflow-auto mt-10 flex flex-col flex-grow h-screen">
                <h1 className="heading-m">New Invoice</h1>

                {/* Bill From*/}
                <div className="bill-from-group flex flex-col">
                    <Label htmlFor="bill-from" className="heading-s-v text-1-primary mb-[1.5rem] mt-[3rem]">Bill
                        From</Label>

                    <div className="group flex flex-col w-full gap-[0.625rem]">
                        <Label htmlFor="to_street_address" className="body-v text-7-info">Street Address</Label>
                        <Input id="from_address"
                               className="w-full mb-[1.5rem] border-5-secondary"
                               value={invoiceData.billFrom.address}
                               onChange={e => handleItemChange('billFrom', 'address', e.target.value)}
                        />
                    </div>
                    <div className="bill-from-group__group2 flex flex-row justify-between w-full gap-[1.5rem]">
                        <div className="group flex flex-col w-full gap-[0.625rem]">
                            <Label htmlFor="from_city" className="body-v text-7-info">City</Label>
                            <Input className="w-full border-5-secondary"
                                   value={invoiceData.billFrom.city}
                                   onChange={e => handleItemChange('billFrom', 'city', e.target.value)}
                            />
                        </div>
                        <div className="group flex flex-col w-full gap-[0.625rem]">
                            <Label htmlFor="from_post_code" className="body-v text-7-info">Post Code</Label>
                            <Input className="w-full border-5-secondary"
                                   value={invoiceData.billFrom.postCode}
                                   onChange={e => handleItemChange('billFrom', 'postCode', e.target.value)}
                            />
                        </div>
                        <div className="group flex flex-col w-full gap-[0.625rem]">
                            <Label htmlFor="from_country" className="body-v text-7-info">Country</Label>
                            <Input className="w-full border-5-secondary"
                                   value={invoiceData.billFrom.country}
                                   onChange={e => handleItemChange('billFrom', 'country', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Bill to*/}
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
                               onChange={e => handleItemChange('billTo', 'clientName', e.target.value)}
                        />
                    </div>
                    <div className="bill-from-group__group3 flex flex-col justify-between w-full gap-[1.5rem]">
                        <div className="group flex flex-col w-full gap-[0.625rem]">
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            <Label htmlFor="to_city" className="body-v text-7-info">Client's Email</Label>
                            <Input className="w-full border-5-secondary"
                                   value={invoiceData.billTo.clientEmail}
                                   onChange={e => handleItemChange('billTo', 'clientEmail', e.target.value)}
                            />
                        </div>
                        <div className="group flex flex-col w-full gap-[0.625rem]">
                            <Label htmlFor="to_address" className="body-v text-7-info">Street Address</Label>
                            <Input className="w-full border-5-secondary"
                                   value={invoiceData.billTo.address}
                                   onChange={e => handleItemChange('billTo', 'address', e.target.value)}
                            />
                        </div>
                        <div className="bill-to-group__group3 flex flex-row justify-between w-full gap-[1.5rem]">
                            <div className="group flex flex-col w-full gap-[0.625rem]">
                                <Label htmlFor="to_city" className="body-v text-7-info">City</Label>
                                <Input className="w-full border-5-secondary"
                                       value={invoiceData.billTo.city}
                                       onChange={e => handleItemChange('billTo', 'city', e.target.value)}
                                />
                            </div>
                            <div className="group flex flex-col w-full gap-[0.625rem]">
                                <Label htmlFor="to_post_code" className="body-v text-7-info">Post Code</Label>
                                <Input className="w-full border-5-secondary"
                                       value={invoiceData.billTo.postCode}
                                       onChange={e => handleItemChange('billTo', 'postCode', e.target.value)}
                                />
                            </div>
                            <div className="group flex flex-col w-full gap-[0.625rem]">
                                <Label htmlFor="to_country" className="body-v text-7-info">Country</Label>
                                <Input className="w-full  border-5-secondary "
                                       value={invoiceData.billTo.country}
                                       onChange={e => handleItemChange('billTo', 'country', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invoice Details */}
                <div className="bill-to-group flex flex-col gap-[1.5rem] mb-[1.5rem] mt-[3rem]">
                    <div className="invoice-date-term-group flex flex-row gap-[1.5rem]">
                        <div className="group flex flex-col w-full gap-[0.625rem] relative ">
                            <Label htmlFor="to_country" className="body-v text-7-info">Invoice Date</Label>
                            <Input
                                className="w-full heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary justify-between"
                                value={invoiceData.invoiceDetails.invoiceDate}
                                onChange={e => handleItemChange('invoiceDetails', 'invoiceDate', e.target.value)}
                            />
                            <div
                                className="data-group flex flex-row justify-between pl-[1.25rem] pr-[1rem] absolute h-full top-[60%] gap-[6rem]">
                                <p className="heading-s-v opacity-50 ">{invoiceData['invoiceDetails']['invoiceDate'].toString()}</p>
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
                            <Input
                                className="w-full heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary"
                                value={invoiceData.invoiceDetails.paymentTerms}
                                onChange={e => handleItemChange('invoiceDetails', 'paymentTerms', e.target.value)}
                            />
                            <div
                                className="data-group flex flex-row justify-between pl-[1.25rem] pr-[1rem] absolute h-full top-[60%] gap-[6rem]">
                                <p className="heading-s-v ">Net 30 Days</p>
                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 10">
                                    <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none"
                                          fillRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="group flex flex-col w-full gap-[0.625rem]">
                        <Label htmlFor="to_country" className="body-v text-7-info">Project Description</Label>
                        <Input className="w-full  border-5-secondary heading-s-v text-8-text"
                               placeholder="e.g Graphic Design Service"
                               value={invoiceData.invoiceDetails.projectDescription}
                               onChange={e => handleItemChange('invoiceDetails', 'projectDescription', e.target.value)}
                        />
                    </div>
                </div>

                {/* Invoice Item List */}
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
                        <div className="group flex w-[3.5rem] flex-col gap-[0.625rem]">
                            <Label htmlFor="to_country" className="body-v text-7-info">Total</Label>
                        </div>

                    </div>

                    {/* map items and display to screen*/}
                    <div className="item-row flex flex-col justify-start items-center gap-[1rem]">
                        {invoiceData['itemList'].map((item, index) => (
                            <div key={index}
                                 className="item-row flex flex-row justify-start items-center gap-[1rem] w-full">
                                <Input className="w-[13.375rem] border-5-secondary" value={item.name}
                                       onChange={e => handleItemChange(e, index, 'name')}/>
                                {/*input, allow numeric values only*/}
                                <Input className="w-[3rem] border-5-secondary hide-arrow-input"
                                       value={item.quantity}
                                       type="number" min="0" max="100" step="1" required="required"
                                       pattern="[0-9]*"
                                       placeholder="0"
                                       onChange={e => handleItemChange(e, index, 'quantity')}
                                />

                                <Input className="w-[6.25rem] border-5-secondary hide-arrow-input"
                                       value={item.price}
                                       placeholder="0.00"
                                       type="number" min="0" max="100" step="0.01" required="required"
                                       onChange={e => handleItemChange(e, index, 'price')}
                                />
                                <p className="grow  h-full heading-s-v text-6-muted pl-2">{item.quantity * item.price}</p>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/delete.png" alt="delete icon" className="w-[1rem] h-[1rem]"
                                     onClick={() => removeItem(index)}
                                />
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


            </div>
            <div className="container-bottom-nav w-full h-[6.875rem] sticky bottom-0 bg-white pl-[7rem]">
                <div className="group-buttons flex flex-row justify-between gap-[0.5rem] mt-[3rem]  w-full
      h-[6.875rem] grow p-[1.5rem]"
                >
                    <Button
                        className="w-[6rem] h-[3rem] rounded-[1.5rem] bg-[#F9FAFE] text-7-info heading-s-v stick"
                        // on click discard all changes and close sheet
                        onClick={() => setSheetOpen(false)}

                    >
                        Discard
                    </Button>
                    <div className="groupbuttons flex flex-row gap-[0.5rem]">
                        <Button className="w-[8.25rem] h-[3rem] rounded-[1.5rem] bg-[#373B53] heading-s-v text-6-muted "
                        >Save as Draft
                        </Button>
                        <Button className="w-[8rem] h-[3rem] rounded-[1.5rem] bg-1-primary text-white"
                                onClick={() => printItems()}

                        >Save & Send
                        </Button>
                    </div>
                </div>
            </div>

        </>

        /* Bill to group */

    );
}
