import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function InvoiceTable() {
  const router = useRouter();
  const [invoiceArray, setInvoiceArray] = useState([]);
  const {filterList, setFilterList, useCallback} = useContext(InvoiceContext);
  const statusColor = {
    draft: '#373B53',
    pending: '#FF8F00',
    paid: '#33D69F'
  }

  useEffect(() => {
    // send fetch get to /api/invoices to get object of invoices
    const type = 'invoice-table'
    let query = ''
    console.log(filterList)
    // if filterList is not empty, create a query string, up to 3 max, dynamic naming, status1, status2, status3
    if (filterList.length > 0) {
      filterList.forEach((status, index) => {
        query += `status${index + 1}=${status}&`
      })
      query = query.slice(0, -1)
      console.log(query)
      fetch(`/api/invoices?type=${type}&${query}`).then(res => res.json()).then(data => {
        // get invoice data by data asscending order
        setInvoiceArray(data.body.invoices)
      })
    } else {
      fetch(`/api/invoices?type=${type}`).then(res => res.json()).then(data => {
        // get invoice data by data asscending order
        setInvoiceArray(data.body.invoices)
      })
    }


  }, [filterList, setFilterList]);


  useEffect(() => {
    // send fetch get to /api/invoices to get object of invoices
    const type = 'invoice-table'

    fetch(`/api/invoices?type=${type}`).then(res => res.json()).then(data => {
      // get invoice data by data asscending order
      setInvoiceArray(data.body.invoices)
    })
  }, [useCallback]);


  function getStatusClasses(status) {
    let baseClasses = "w-[6rem] h-[2.75rem] flex flex-row rounded-[0.375rem] mr-[1.25rem] justify-center items-center heading-s-v capitalize bg-opacity-[6%]";
    switch (status) {
      case 'draft':
        return `${baseClasses} bg-[#373B53] text-[#373B53]`;
      case 'pending':
        return `${baseClasses} bg-[#FF8F00] text-[#FF8F00]`;
      case 'paid':
        return `${baseClasses} bg-[#33D69F] text-[#33D69F]`;
      default:
        return baseClasses; // default classes
    }
  }


  return (
    <div className="w-[45.625rem] flex flex-col justify-center items-center text-center">
      <table className="w-full text-center items-center justify-center">
        <tbody className="flex flex-col gap-4 w-full text-center ">
        {invoiceArray.map((invoice, key) => {
          return (
            <tr key={key} className="row_contaienr flex flex-row  bg-white h-[4.5rem] justify-start items-center w-full
            px-[2rem] hover:border-1-primary hover:border-[1px] hover:cursor-pointer hover:scale-110"
                onClick={() => {
                  router.push(`/dashboard/invoices/${invoice.id}`)
                }}
            >
              <td className="flex flex-row justify-start items-center w-[6rem] group"><span
                className="text-7-info heading-s-v">#</span>
                <div className="heading-s-v">{invoice.id}</div>
              </td>
              <td className="flex flex-row justify-center heading-s-v text-7-info gap-2 w-[12rem] mr-[2rem]"><span
                className="text-6-muted">Due</span> {invoice.due_date}</td>
              <td
                className="flex flex-row heading-s-v text-7-info w-[8rem]">{invoice.clientName ? invoice.clientName : 'Not Available'}</td>
              <td
                className="heading-s text-8-text flex flex-row justify-center items-center w-[7rem]">$ {invoice.total}</td>
              <td className={getStatusClasses(invoice.status)}>
                <li>{invoice.status}</li>
              </td>

              <td>
                <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
                </svg>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}
