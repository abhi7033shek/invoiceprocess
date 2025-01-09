import React, { useState } from 'react';
import logo from '../logo.jpg';
import { useNavigate } from 'react-router-dom';
import './SearchInvoice.css'; // Ensure you have this CSS file for print styles

function SearchInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const data = localStorage.getItem(invoiceNumber);
    if (data) {
      setInvoiceData(JSON.parse(data));
    } else {
      alert('Invoice not found!');
    }
  };

  const handleEdit = () => {
    navigate('/invoice', { state: { invoiceData } });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="no-print">
        <h2 className='heading'>Search Invoice</h2>
        <input className='input'
          type="text"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          placeholder="Enter Invoice Number"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {invoiceData && (
        <div className='a4-page'>
          <div className='webpage'>
            <main>
              <div className='main'>
                <div><h4 className='tax'>Tax Invoice</h4></div>
                <div>
                  <table className='fixed'>
                    <thead>
                      <tr>
                        <th>Invoice Date</th>
                        <td>{invoiceData.date}</td>
                      </tr>
                      <tr>
                        <th>Invoice No.</th>
                        <td>{invoiceData.invoiceNumber}</td>
                      </tr>
                      <tr>
                        <th>Quote No.</th>
                        <td>
                          {invoiceData.customerDetails.quoteNo}
                        </td>
                      </tr>
                      <tr>
                        <th>GST No.</th>
                        <td>29AAMCM3634KIZZ</td>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className='img'>
                  <br></br>
                  <img src={logo} alt='logo' />
                </div>
                <br />
                <br />
                <br />
                <div>
                  <table className='customer'>
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Quote</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {invoiceData.customerDetails.detail}
                        </td>
                        <td>
                          <table className='potable'>
                            <tbody>
                              <tr>
                                <th>PO No.</th>
                                <td>
                                  {invoiceData.customerDetails.poNo}
                                </td>
                              </tr>
                              <tr>
                                <th>PO Date</th>
                                <td>
                                  {invoiceData.customerDetails.poDate}
                                </td>
                              </tr>
                              <tr>
                                <th>GST No</th>
                                <td>
                                  {invoiceData.customerDetails.gstNo}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <table className='sino'>
                  <thead>
                    <tr>
                      <th>SI No.</th>
                      <th>Particular Part No</th>
                      <th>HSN Code</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th>Line Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.rows.map((row, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{row.partno}</td>
                        <td>{row.hsncode}</td>
                        <td>{row.qty}</td>
                        <td>{row.unitprice}</td>
                        <td>{(row.qty * row.unitprice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <table className="subtotal-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <td>{invoiceData.subtotal}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Shipping</th>
                      <td>--</td>
                    </tr>
                    <tr>
                      <th>SGST 9%</th>
                      <td>{invoiceData.gstValues.SGST || '--'}</td>
                    </tr>
                    <tr>
                      <th>CGST 9%</th>
                      <td>{invoiceData.gstValues.CGST || '--'}</td>
                    </tr>
                    <tr>
                      <th>IGST 18%</th>
                      <td>{invoiceData.gstValues.IGST || '--'}</td>
                    </tr>
                    <tr>
                      <th>Grand Total</th>
                      <td>{invoiceData.grandTotal}</td>
                    </tr>
                  </tbody>
                </table>
                <table className='account'>
                  <thead>
                    <tr>
                      <th>Accounts details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='account-font'>
                        Account detail: Minrflare
                        <br />
                        Technologies Private Limited
                        <br />
                        Account No: 50200056296410
                        <br />
                        IFS Code: HDFC0000053
                        <br />
                        GST: 29AAMCM3634KIZZ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="no-print">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handlePrint}>Print</button>
              </div>
              <footer className='footer'>
            <div>

          Thank you for your business!<br/>
          #328, 1st Stage indiranagar, Bangalore- 560038<br/>
          Tel: +91- 9731441118, Email: info@minrflaresoftware.com
            </div>
         
        </footer>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchInvoice;
