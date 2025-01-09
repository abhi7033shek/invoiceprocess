
import React from 'react';
import logo from '../logo.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import './Invoice.css'; // Ensure you have this CSS file for print styles



function OnSubmit() {
  const location = useLocation();
  const { invoiceData } = location.state || {
    invoiceData: { 
      rows: [], 
      gstValues: { IGST: '--', CGST: '--', SGST: '--' }, 
      customerDetails: { detail: '', gstNo: '', poNo: '', poDate: '' },
      gstPercent: 0,
      selectedGST: ''
    }
  };
  
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/invoice', { state: { invoiceData } });
  };

  const handleSubmit = () => {
    // Save invoiceData to local storage
    localStorage.setItem(invoiceData.invoiceNumber, JSON.stringify(invoiceData));
    localStorage.setItem(invoiceData.customerDetails.gstNo, JSON.stringify(invoiceData.customerDetails));
    // Show alert
    alert('Invoice data saved successfully!');
    // Redirect to new Invoice page
    navigate('/invoice', {
      state: {
        invoiceData: {
          rows: [],
          invoiceNumber: `MF/${Date.now()}`,
          date: '',
          subtotal: 0,
          grandTotal: 0,
          gstPercent: 0,
          gstValues: { IGST: '--', CGST: '--', SGST: '--' },
          customerDetails: { detail: '', gstNo: '', poNo: '', poDate: '' },
          selectedGST: ''
        }
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='a4-page'>
      <div className='webpage'>
        <main>
          <div className='main'>
            <div>
              <p className='tax'>Tax Invoice</p>
            <p className='customer-copy'>(Customer copy)</p>
            
            </div>
            <div className='height'>
            <div className='mar-gin'>
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
                    <td>{invoiceData.customerDetails.quoteNo}</td>
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
            
            <div className='margi-n'>
              <table className='customer'>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Quote</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{invoiceData.customerDetails.detail}</td>
                    <td>
                      <table className='potable'>
                        <tbody>
                          <tr>
                            <th>PO No.</th>
                            <td>{invoiceData.customerDetails.poNo}</td>
                          </tr>
                          <tr>
                            <th>PO Date</th>
                            <td>{invoiceData.customerDetails.poDate}</td>
                          </tr>
                          <tr>
                            <th>GST No</th>
                            <td>{invoiceData.customerDetails.gstNo}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                  <th>Tax</th>
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
                    <td>{row.taxpercent}%</td>
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
                  <th>SGST</th>
                  <td>{invoiceData.selectedGST === 'CGST_SGST' ? invoiceData.gstValues.SGST : '--'}</td>
                </tr>
                <tr>
                  <th>CGST</th>
                  <td>{invoiceData.selectedGST === 'CGST_SGST' ? invoiceData.gstValues.CGST : '--'}</td>
                </tr>
                <tr>
                  <th>IGST </th>
                  <td>{invoiceData.selectedGST === 'IGST' ? invoiceData.gstValues.IGST : '--'}</td>
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
                    Account detail: Mineflare
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
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handlePrint}>Print</button>
          </div>
          <div>
            <br/>
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default OnSubmit;
