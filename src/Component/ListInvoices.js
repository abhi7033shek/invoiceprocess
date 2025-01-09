import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ListInvoices() {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedInvoices = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('MF/')) {
        savedInvoices.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setInvoices(savedInvoices);
  }, []);

  const handleViewDetails = (invoice) => {
    navigate('/viewinvoices', { state: { invoiceData: invoice } });
  };

  const handleDelete = (invoiceNumber) => {
    localStorage.removeItem(invoiceNumber);
    setInvoices(invoices.filter(invoice => invoice.invoiceNumber !== invoiceNumber));
  };

  return (
    <div>
      <h2>Saved Invoices</h2>
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index}>
            Invoice No: {invoice.invoiceNumber} 
            <button onClick={() => handleViewDetails(invoice)}>View Details</button>
            <button onClick={() => handleDelete(invoice.invoiceNumber)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListInvoices;
