export const handleSubmit = async (method, action, invoiceData, status) => {

  if (method === 'GET') {
    // Handle GET requests
  } else if (method === 'POST') {

    // Handle Post requests

    const requestOptions = {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({invoiceData, status: status}),
    }
    const res = await fetch(action, requestOptions);
    const data = await res.json();
    return Response.json({
      status: '201',
      body: {
        status: 'success'
      }
    })


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
