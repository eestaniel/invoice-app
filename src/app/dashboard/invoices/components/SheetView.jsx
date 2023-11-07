"use client"
import {useState, useEffect, useRef} from "react";
import {Input} from "@/@/components/ui/input"
import {Label} from "@/@/components/ui/label"
import {Button} from "@/@/components/ui/button";
import {Calendar} from "@/@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/@/components/ui/popover"
import {format} from 'date-fns';


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
            invoiceDate: new Date().toString(),
            paymentTerms: 'Net 30 Days',
            projectDescription: ''
        },
        itemList: []

    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isTermsPopoverOpen, setIsTermsPopoverOpen] = useState(false);
    const formRef = useRef(null);

    const focusForm = () => {
        if (formRef.current) {
            formRef.current.focus(); // Brings the form into focus
        }
    };

    const addItem = () => {
        const newItem = {name: "", quantity: "", price: "", total: ""};
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

    const handleChange = (section, field, value, index = null) => {
        if (index != null) {
            // Handle itemList array
            const newItems = [...invoiceData[section]];
            newItems[index] = {
                ...newItems[index],
                [field]: value
            };
            setInvoiceData({
                ...invoiceData,
                [section]: newItems
            });
        } else {
            // Handle other fields
            setInvoiceData({
                ...invoiceData,
                [section]: {
                    ...invoiceData[section],
                    [field]: value
                }
            });
        }
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
            <div id="thisForm"
                 ref={formRef}
                 className="pl-[10.5rem] pr-[3.5rem] w-full] overflow-auto mt-10 flex flex-col flex-grow h-fit">
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
                               onChange={e => handleChange('billFrom', 'address', e.target.value)}
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
                                   value={invoiceData.billFrom.postCode}
                                   onChange={e => handleChange('billFrom', 'postCode', e.target.value)}
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
                                       value={invoiceData.billTo.postCode}
                                       onChange={e => handleChange('billTo', 'postCode', e.target.value)}
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

                {/* Invoice Details */}
                <div className="bill-to-group flex flex-col gap-[1.5rem] mb-[1.5rem] mt-[3rem]">
                    <div className="invoice-date-term-group flex flex-row gap-[1.5rem]">
                        <div className="group flex flex-col h-full w-full gap-[0.625rem] relative ">
                            <Label htmlFor="invoice_date" className="body-v text-7-info">Invoice Date</Label>
                            <Popover isOpen={isPopoverOpen} onOpen={() => setIsPopoverOpen(true)}
                                     onClose={() => setIsPopoverOpen(false)}>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"}
                                            className={("w-full justify-start text-left heading-s-v opacity-50 group-hover:cursor-pointer group-hover:border-1-primary group-hover:opacity-100")}>
                                        {selectedDate && !isNaN(selectedDate.getTime())
                                            ? format(selectedDate, "dd MMM yyyy")
                                            : <span>Pick a date</span>
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date) => {
                                            if (date) {
                                                setSelectedDate(date);
                                                handleChange('invoiceDetails', 'invoiceDate', format(date, "dd MMM yyyy"));
                                            }
                                            setIsPopoverOpen(false);
                                            focusForm()
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* payment Terms*/}
                        <div className="group flex flex-col w-full gap-[0.625rem] relative">
                            <Label htmlFor="payment_terms" className="body-v text-7-info">Payment Terms</Label>
                            <Popover isOpen={isTermsPopoverOpen} onOpen={() => setIsTermsPopoverOpen(true)}
                                     onClose={() => setIsTermsPopoverOpen(false)}>
                                <PopoverTrigger asChild>
                                    <div className="flex justify-between items-center hover:cursor-pointer group">
                                        <Input
                                            id="payment_terms"
                                            className="w-full heading-s-v text-8-text opacity-[50%] pl-[1.25rem] border-5-secondary group-hover:border-1-primary group-hover:opacity-100
                                            group-hover:cursor-pointer"
                                            value={invoiceData.invoiceDetails.paymentTerms}
                                            // onclick set oposite value of isTermsPopoverOpen
                                            onClick={() => setIsTermsPopoverOpen(!isTermsPopoverOpen)}
                                            onChange={e => handleChange('invoiceDetails', 'paymentTerms', e.target.value)}
                                        />
                                        <div className="svg absolute right-4">
                                            {isTermsPopoverOpen ? (
                                                <svg width="10" height="7" viewBox="0 0 10 7" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 6.22803L5.2279 2.00013L9.4558 6.22803" stroke="#7C5DFA"
                                                          strokeWidth="2" fill="none"/>
                                                </svg>
                                            ) : (
                                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 15 10">
                                                    <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2"
                                                          fill="none" fillRule="evenodd"/>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-[15rem] p-0 ">
                                    {/* Popover content */}
                                    <div className="w-full group">
                                        <p className="heading-s-v text-8-text w-full pl-6 py-4 group-hover:cursor-pointer group-hover:text-1-primary"
                                           onClick={() => {
                                               handleChange('invoiceDetails', 'paymentTerms', 'Net 1 Day');
                                               setIsTermsPopoverOpen(!isTermsPopoverOpen)
                                               focusForm()
                                           }}
                                        >Net 1 Day
                                        </p>
                                        <hr/>
                                    </div>
                                    <div className="w-full group">
                                        <p className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                                           onClick={() => handleChange('invoiceDetails', 'paymentTerms', 'Net 7 Day')}
                                        >Net 7 Day</p>
                                        <hr/>
                                    </div>
                                    <div className="w-full group">
                                        <p className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                                           onClick={() => handleChange('invoiceDetails', 'paymentTerms', 'Net 14 Day')}
                                        >Net 14 Day</p>
                                        <hr/>
                                    </div>
                                    <div className="w-full group">
                                        <p className="heading-s-v text-8-text w-full pl-6 my-4 group-hover:cursor-pointer group-hover:text-1-primary"
                                           onClick={() => handleChange('invoiceDetails', 'paymentTerms', 'Net 30 Day')}
                                        >Net 30 Day</p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>
                    <div className="group flex flex-col w-full gap-[0.625rem]">
                        <Label htmlFor="to_country" className="body-v text-7-info">Project Description</Label>
                        <Input className="w-full  border-5-secondary heading-s-v text-8-text"
                               placeholder="e.g Graphic Design Service"
                               value={invoiceData.invoiceDetails.projectDescription}
                               onChange={e => handleChange('invoiceDetails', 'projectDescription', e.target.value)}
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
                                <Input className="w-[13.375rem] border-5-secondary"
                                       value={item.name}
                                       onChange={e => handleChange('itemList', 'name', e.target.value, index)}
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
