"use client"
import {createContext, useEffect, useState, useContext} from 'react';
import {AuthContext} from "@/app/dashboard/context/AuthContext";

// Create a context
export const InvoiceContext = createContext();

export const InvoiceProvider = ({children}) => {
  const [invoiceList, setInvoiceList] = useState([]);
  const [shouldFetchInvoices, setShouldFetchInvoices] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [updateSummary, setUpdateSummary] = useState(false)
  const {currentUser} = useContext(AuthContext)

  const fetchInvoices = () => {
    const type = 'invoice-table'

    if (filterList.length === 0) {
      fetch(`/api/invoices?type=${type}&uid=${currentUser?.uid}`).then(res => res.json()).then(data => {
        // get invoice data by data ascending order
        if (data.body.invoices.length > 0) {
          setInvoiceList(data.body.invoices)
        } else {
          setInvoiceList([])
        }
      })
    } else  {
      // send fetch get to /api/invoices to get object of invoices
      let query = ''
      // if filterList is not empty, create a query string, up to 3 max, dynamic naming, status1, status2, status3

      filterList.forEach((status, index) => {
        query += `status${index + 1}=${status}&`
      })
      query = query.slice(0, -1)
      fetch(`/api/invoices?type=${type}&uid=${currentUser?.uid}&${query}`).then(res => res.json()).then(data => {
        // get invoice data by data asscending order
        setInvoiceList(data.body.invoices)
      })
    }
  }

  useEffect(() => {
    console.log(filterList)
  }, []);

  useEffect(() => {
    fetchInvoices()

  }, [filterList, shouldFetchInvoices]);


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

  const toggleFetchInvoices = () => {
    setShouldFetchInvoices(!shouldFetchInvoices);
  }
  /*#################### Color Theme ####################*/
  // function to toggle night mode
  const toggleNightMode = () => {
    // toggle night mode
    setIsNightMode(!isNightMode);
  }

  const theme = {
    background: isNightMode ? 'bg-12-subtext' : 'bg-11-light',
    page_header: isNightMode ? 'text-white' : 'text-8-text',

    // Invoice List
    filter_popup: isNightMode ? 'bg-4-base' : 'bg-white',
    filter_options: isNightMode ? 'text-white' : 'text-3-dark',
    filter_box: isNightMode ? 'border-4-base bg-3-dark' : ' group-hover:border-1-primary group-hover:bg-5-secondary',
    table_row: isNightMode ? 'bg-3-dark' : 'bg-white',
    text: isNightMode ? 'text-white' : 'text-8-text',
    table_due: isNightMode ? 'text-5-secondary' : 'text-6-muted',
    table_date: isNightMode ? 'text-5-secondary' : 'text-7-info',
    table_client_name: isNightMode ? 'text-white' : 'text-7-info',

    // Invoice Sheet
    sheet_bg: isNightMode ? 'bg-12-subtext' : 'bg-white',
    sheet_label: isNightMode ? 'body-v text-5-secondary' : 'body-v text-7-info',
    sheet_input: isNightMode ? 'bg-3-dark border-3-dark text-white caret-1-primary heading-s-v ' : 'heading-s-v caret-1-primary',
    sheet_add_button: isNightMode ? 'bg-4-base hover:brightness-150 text-white' : 'bg-[#F9FAFE] text-7-info hover:bg-5-secondary ',
    popup: isNightMode ? 'bg-4-base border-4-base text-5-secondary' : 'bg-white',
    payment_border: isNightMode ? 'border-3-dark' : '',
    edit_cancel: isNightMode ? 'bg-4-base hover:text-7-info hover:bg-white text-5-secondary' : 'bg-[#F9FAFE] text-7-info hover:bg-5-secondary ',

    // Summary Page
    go_back: isNightMode ? 'text-5-secondary hover:text-6-muted' : 'text-7-info hover:text-8-text',
    edit_button: isNightMode ? 'bg-4-base hover:text-7-info hover:bg-white text-5-secondary' : ' bg-[#F9FAFE] text-7-info hover:bg-5-secondary ',
    summary_table: isNightMode ? 'bg-4-base' : 'bg-[#F9FAFE]',
    summary_total: isNightMode ? 'text-white bg-8-text' : 'bg-[#373B53] text-7-info',
    summary_text: isNightMode ? 'text-5-secondary' : 'text-8-text',
    summary_price_info: isNightMode ? 'text-6-muted' : 'text-7-info',

    // Navigation
    navigation: isNightMode ? 'bg-3-dark' : 'bg-[#373B53]',

    // Confirm Deletion
    delete_border: isNightMode ? 'border-3-dark' : '',
    cancel_button: isNightMode ? 'bg-4-base border-none hover:bg-8-text text-5-secondary' : 'bg-[#F9FAFE] text-7-info hover:bg-5-secondary ',
  };


  return (
    < InvoiceContext.Provider value={{
      invoiceList, addInvoice, setInvoices, getInvoices, removeInvoice,
      shouldFetchInvoices, setShouldFetchInvoices, toggleFetchInvoices,
      filterList, setFilterList,
      toggleNightMode, isNightMode, setIsNightMode, theme,
      updateSummary, setUpdateSummary, fetchInvoices
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};
