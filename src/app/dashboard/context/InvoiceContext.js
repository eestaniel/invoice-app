"use client"
import {createContext, useState} from 'react';

// Create a context
export const InvoiceContext = createContext();

export const InvoiceProvider = ({children}) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [shouldFetchInvoices, setShouldFetchInvoices] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [isNightMode, setIsNightMode] = useState(false);

  /*#################### Invoice functions ####################*/
  // Function to update invoices
  const addInvoice = (invoiceId) => {

    /*append invoiceId to invoiceList*/
    setInvoiceList([...invoiceList, invoiceId]);
  }

  // function to add invoices to invoice list
  const setInvoices = (invoiceIds) => {
    // append invoiceIds to invoiceList
    setInvoiceList(invoiceIds);
  }

  // Function to get invoices
  const getInvoices = () => {
    // return invoiceList
    return invoiceList;
  }

  // function to remove invoice from invoice list
  const removeInvoice = (invoiceId) => {
    // scan array, remove invoice with matching id
    invoiceList.filter((id) => id !== invoiceId);
  }

  /*#################### Color Theme ####################*/
  // function to toggle night mode
  const toggleNightMode = () => {
    // toggle night mode
    setIsNightMode(!isNightMode);
    console.log(isNightMode)
  }

  const theme = {
    background: isNightMode ? 'bg-12-subtext' : 'bg-11-light',
    page_header: isNightMode ? 'text-white' : 'text-8-text',

    // Invoice List
    filter_popup: isNightMode ? 'bg-4-base' : 'bg-white',
    filter_options: isNightMode ? 'text-white' : 'text-3-dark',
    table_row: isNightMode ? 'bg-3-dark' : 'bg-white',
    text: isNightMode ? 'text-white' : 'text-8-text',
    table_due: isNightMode ? 'text-5-secondary' : 'text-6-info',
    table_date: isNightMode ? 'text-5-secondary' : 'text-7-info',
    table_client_name: isNightMode ? 'text-white' : 'text-7-info',
  };


  return (
    < InvoiceContext.Provider value={{
      invoiceList, addInvoice, setInvoices, getInvoices, removeInvoice,
      shouldFetchInvoices, setShouldFetchInvoices,
      filterList, setFilterList,
      toggleNightMode, isNightMode,setIsNightMode, theme
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};
