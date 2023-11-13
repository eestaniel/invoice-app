export const handleSubmit = async (method, action, invoiceData) => {

  if (method === 'GET') {
    // Handle GET requests
  } else if (method === 'POST') {
    console.log('invoiceData', invoiceData)
    // Handle POST requests
    const requestOptions = {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({invoiceData}),
    }
    const res = await fetch(action, requestOptions);
    const data = await res.json();
    console.log(data)


  } else if (method === 'PUT') {
    // Handle PUT requests
    const requestOptions = {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({invoiceData}),
    }

    const res = await fetch('/api/invoices', requestOptions);
    return await res.json();


  }
}
