"use client"
import {createContext, useState} from 'react';

// Create a context
export const InvoiceContext = createContext();

export const InvoiceProvider = ({children}) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [shouldFetchInvoices , setShouldFetchInvoices ] = useState(false);
  const [filterList, setFilterList] = useState([]);



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

  return (
    < InvoiceContext.Provider value={{
      invoiceList, addInvoice, setInvoices, getInvoices, removeInvoice,
      shouldFetchInvoices, setShouldFetchInvoices,
      filterList, setFilterList
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};
