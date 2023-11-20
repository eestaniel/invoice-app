import {InvoiceContext} from "@/app/dashboard/context/InvoiceContext";
import {useContext} from "react";
import {useRouter} from "next/navigation";

export default function InvoiceTable() {
  const router = useRouter();

  const {theme, invoiceList, setSelectedInvoice} = useContext(InvoiceContext);


  const handleViewInvoice = (custom_id) => {
   // get object from invoiceList that contains the custom_id
    const invoice = invoiceList.find((invoice) => invoice.invoice_details.custom_id === custom_id);
    setSelectedInvoice(invoice);
    router.push(`/dashboard/invoices/${invoice.invoice_details.custom_id}`);
  }


  function getStatusClasses(status) {
    let baseClasses = " flex flex-row rounded-[0.375rem] justify-center items-center heading-s-v capitalize bg-opacity-[10%]";
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
    <div className="w-full lg:basis-[730px] md:flex-shrink  lg:w-0 flex flex-col ">
      <div className="hidden lg:inline">
        <table className="flex w-full text-center items-center justify-center">
          <tbody className="flex flex-col gap-4 text-center justify-center lg:basis-full flex-shrink">
          {invoiceList.map((invoice, key) => {
            return (
              <tr key={key} className={`row_contaienr flex flex-row  ${theme.table_row} h-[4.5rem] justify-start items-center basis-[730px]]
                px-[2rem] hover:border-1-primary hover:border-[1px] hover:cursor-pointer hover:scale-110 rounded-[.5rem] gap-4`}
                  onClick={() => {
                    handleViewInvoice(invoice.invoice_details.custom_id);
                  }}
              >
                <td className="flex flex-row justify-start items-center group flex-grow basis-[3.75rem] "><span
                  className="text-7-info heading-s-v">#</span>
                  <div className={`heading-s-v ${theme.text}`}>{invoice.invoice_details.custom_id}</div>
                </td>
                <td
                  className="flex flex-row justify-start body-v text-7-info gap-2 basis[6.25rem] flex-grow  whitespace-nowrap">
                  <p className={`${theme.table_due}`}>Due <span
                    className={`${theme.table_date}`}>{invoice.invoice_details.due_date}</span></p>
                </td>
                <td
                  className={`flex flex-row body-v ${theme.table_client_name} justify-left basis-[8rem] whitespace-nowrap`}>{invoice.bill_to?.client_name ? invoice.bill_to?.client_name : 'Not Available'}</td>
                <td
                  className={`heading-s ${theme.text} flex flex-row justify-end   items-center basis-full] flex-grow whitespace-nowrap`}>$ {invoice.invoice_details.total}</td>
                <td
                  className={`w-fit h-fit p-4 flex items-center justify-end flex-grow flex-shrink-0  basis-[6.5rem] ${getStatusClasses(invoice.invoice_details.status)}`}>
                  <li>{invoice.invoice_details.status}</li>
                </td>

                <td>
                  <svg className="ml-4"
                       width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1l4 4-4 4" stroke="#7C5DFA" strokeWidth="2" fill="none" fillRule="evenodd"/>
                  </svg>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden w-full">
        <table className="w-full text-center items-center justify-center">
          <tbody className="flex flex-col gap-4 w-full text-center lg:px-0">
          {invoiceList.map((invoice, key) => {
            return (
              <tr key={key}
                  className={`row_contaienr flex flex-row  ${theme.table_row} h-fit justify-between items-center w-full
                    p-6 hover:border-1-primary gap-8
                    hover:border-[1px] hover:cursor-pointer hover:scale-110 rounded-[.5rem]`}

                  onClick={() => {
                    handleViewInvoice(invoice.invoice_details.custom_id)
                  }}
              >
                <td className="flex flex-col justify-start text-left w-full lg:w-[6rem] group ">
                  <div className="flex flex-row mb-6">
                    <span className="text-7-info heading-s-v">#</span>
                    <div className={`heading-s-v ${theme.text}`}>{invoice.invoice_details.custom_id}</div>
                  </div>
                  <div className="flex flex-row text-6-muted body-v mb-2">
                    <p className={`${theme.table_date}`}><span
                      className={`${theme.table_due}`}>Due </span> {invoice.invoice_details.due_date}</p>

                  </div>
                  <div className={`heading-s-v ${theme.text}`}>
                    $ {invoice.invoice_details.total}
                  </div>
                </td>
                <td className="flex flex-col body-v text-7-info w-fit gap-6">
                  <div className={`flex flex-row whitespace-nowrap justify-end ${theme.table_client_name}`}>
                    {invoice.bill_to.client_name ? invoice.bill_to.client_name : 'Not Available'}
                  </div>
                  <div className={`${getStatusClasses(invoice.invoice_details.status)} h-9 w-[6rem]`}>
                    <li>{invoice.invoice_details.status}</li>
                  </div>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
