"use client"
import {createContext, useState} from 'react';

// Create a context
export const InvoiceContext = createContext();

export const InvoiceProvider = ({children}) => {
  const [invoiceList, setInvoiceList] = useState([]);

  // Function to update invoices
  const addInvoice = (invoiceId) => {

    /*append invoiceId to invoiceList*/
    setInvoiceList([...invoiceList, invoiceId]);
  }

  // function to add invoices to invoice list
  const addInvoices = (invoiceIds) => {
    // append invoiceIds to invoiceList
    setInvoiceList([...invoiceList, ...invoiceIds]);
  }

  // Function to get invoices
  const getInvoices = () => {
    // return invoiceList
    return invoiceList;
  }

  // function to remove invoice from invoice list
  const removeInvoice = (invoiceId) => {
    // scan array, remove invoice with matching id
    const newInvoiceList = invoiceList.filter((id) => id !== invoiceId);
  }

  return (
    < InvoiceContext.Provider value={{invoiceList, addInvoice, addInvoices, getInvoices, removeInvoice,}}>
      {children}
    </InvoiceContext.Provider>
  );
};
