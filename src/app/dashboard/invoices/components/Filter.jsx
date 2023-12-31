"use client"
import {Popover, PopoverContent, PopoverTrigger} from "@/@/components/ui/popover";
import {Checkbox} from "@/@/components/ui/checkbox";
import {useState, useRef, useContext} from "react";
import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";


export default function Filter() {
  const [filterState, setFilterState] = useState(false);
  const filterRef = useRef(null);
  const {filterList, setFilterList, theme} = useContext(InvoiceContext);




  return (
    <>
      {/* filter group */}
      <div className="filter-group flex flex-row justify-center items-center gap-[0.875rem]">
        <Popover open={filterState} onOpenChange={setFilterState}>
          <PopoverTrigger>
            <p className={`heading-s-v ${theme.page_header} flex flex-row justify-center items-center gap-3 lg:gap-[0.875rem] whitespace-nowrap hover:cursor-pointer`}>
              <span className="lg:hidden">Filter</span>
              <span className=" hidden lg:inline">Filter by status</span>
              {!filterState ?
              (
                <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1l4.228 4.228L9.456 1" stroke="#7C5DFA" strokeWidth="2" fill="none"
                        fillRule="evenodd"/>
                </svg>
              ) :
              (
                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6.22803L5.2279 2.00013L9.4558 6.22803" stroke="#7C5DFA" strokeWidth="2"/>
                </svg>
              )}</p>
          </PopoverTrigger>
          {/* Popover Contents */}
          <PopoverContent
            id="filterPopup" ref={filterRef} className={`${theme.filter_popup} w-[12rem] h-[8rem] flex flex-col items-start justify-center text-left gap-5 lg:gap-2 pl-[1.5rem]`}>
            <div className="flex items-center space-x-2  hover:cursor-pointer group">
              {/* option 1*/}
              <Checkbox
                id="draft"
                checked={filterList.includes("draft")}
                className={`group-hover:border-1-primary ${theme.filter_box}`}
                onClick={() => {

                  setFilterList(prevSelection =>
                    prevSelection.includes("draft")
                      ? prevSelection.filter(item => item !== "draft")
                      : [...prevSelection, "draft"]
                  );
                }}
              />
              <label
                htmlFor="draft"
                className={`heading-s-v ${theme.filter_options} leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:cursor-pointer`}
              >
                Draft
              </label>
            </div>

            {/* option 2*/}
            <div className="flex items-center space-x-2 group">
              <Checkbox
                id="pending"
                checked={filterList.includes("pending")}
                className={`group-hover:border-1-primary ${theme.filter_box}`}
                onClick={() => {
                  setFilterList(prevSelection =>
                    prevSelection.includes("pending")
                      ? prevSelection.filter(item => item !== "pending")
                      : [...prevSelection, "pending"]
                  );
                }}
              />
              <label
                htmlFor="pending"
                className={`heading-s-v ${theme.filter_options} leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:cursor-pointer`}
              >
                Pending
              </label>
            </div>

            {/* option 3*/}
            <div className="flex items-center space-x-2 group">
              <Checkbox
                id="paid"
                checked={filterList.includes("paid")}
                className={`group-hover:border-1-primary ${theme.filter_box}`}
                onClick={() => {
                  setFilterList(prevSelection =>
                    prevSelection.includes("paid")
                      ? prevSelection.filter(item => item !== "paid")
                      : [...prevSelection, "paid"]
                  );
                }}
              />
              <label
                htmlFor="paid"
                className={`heading-s-v ${theme.filter_options} leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:cursor-pointer`}
              >
                Paid
              </label>
            </div>

          </PopoverContent>
        </Popover>


      </div>
    </>
  );
}
