"use client"
import { createContext, useState } from 'react';

// Create a context
export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoiceList, setInvoiceList] = useState([]);

  // Function to update invoices
  const addInvoice = (invoiceId) => {

    /*append invoiceId to invoiceList*/
setInvoiceList([...invoiceList, invoiceId]);
  }

  // function to remove invoice from invoice list
  const removeInvoice = (invoiceId) => {
    // scan array, remove invoice with matching id
    let newInvoiceList = invoiceList.filter(invoice => invoice.id !== invoiceId);
    setInvoiceList(newInvoiceList);
  }

  return (
    < InvoiceContext.Provider value={{ invoiceList, addInvoice, removeInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};
