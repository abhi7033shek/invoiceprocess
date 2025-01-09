import React, { useState, useEffect, useRef } from 'react';
import './Invoice.css';
import logo from '../logo.jpg';
import { Addproduct } from './Addproduct';
import Subtotal from './Subtotal';
import { Table } from './Table';
import GSTModal from './GSTModal';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${year}/${date}/${month}`;
}


export const Invoice = ({ onAddRow, onDeleteRow, onEditRow, onResetRows }) => {
  const location = useLocation();
  const { invoiceData } = location.state || {
    invoiceData: {
      rows: [],
      invoiceNumber: `MF/${Date.now()}`,
      date: getDate(),
      subtotal: 0,
     gstPercent: 0,
      grandTotal: 0,
      gstValues: { IGST: 0, CGST: 0, SGST: 0 },
      customerDetails: { detail: '', gstNo: '', poNo: '', poDate: '', quoteNo: '' },
      
    }
  };

  const [rows, setRows] = useState(invoiceData.rows);
  const [invoiceNumber] = useState(invoiceData.invoiceNumber);
  const [currentDate, setCurrentDate] = useState(invoiceData.date);
  const [subtotal, setSubtotal] = useState(invoiceData.subtotal);
  const [grandTotal, setGrandTotal] = useState(invoiceData.grandTotal);
  const [gstValues, setGstValues] = useState(invoiceData.gstValues);
  const [customerDetails, setCustomerDetails] = useState(invoiceData.customerDetails);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [isGSTModalOpen, setIsGSTModalOpen] = useState(false);
  const [selectedGST, setSelectedGST] = useState('');
  const navigate = useNavigate();
  


  const detailRef = useRef(null); 
  const poNoRef = useRef(null); 
  const poDateRef = useRef(null); 
  const gstNoRef = useRef(null);
  const AddbtnRef = useRef(null);
 

  const calculateSubtotal = () => {
    return rows.reduce((total, row) => total + row.qty * row.unitprice , 0).toFixed(2);
  };

  useEffect(() => {
    setSubtotal(parseFloat(calculateSubtotal()));
  }, [rows]);


  const totalGST = rows.reduce((total, row) => total + (row.qty * row.unitprice * row.taxpercent) / 100, 0); 
  const gstPercent = (totalGST/subtotal)*100;
  
  


  const handleAddProduct = (product) => {
    const updatedRows = [...rows];
    if (rowToEdit !== null) {
      updatedRows[rowToEdit] = product;
      setRowToEdit(null);
    } else {
      updatedRows.push(product);
    }
    setRows(updatedRows);
    setAddProductOpen(false);
  };

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setAddProductOpen(true);
  };

  const openGSTModal = () => {
    setIsGSTModalOpen(true);
  };

  const closeGSTModal = () => {
    setIsGSTModalOpen(false);
  };

  const handleGSTSelection = (gstType) => {
    let gstAmount = 0;

    if (gstType === 'IGST') {
      gstAmount = totalGST ; // 18% IGST
      setGstValues({ IGST: gstAmount.toFixed(2), CGST: null, SGST: null });
    } else if (gstType === 'CGST_SGST') {
      gstAmount = totalGST/2; // 9% CGST and SGST each
      setGstValues({ IGST: null, CGST: gstAmount.toFixed(2), SGST: gstAmount.toFixed(2) });
    }

    setGrandTotal((parseFloat(subtotal) + gstAmount * (gstType === 'CGST_SGST' ? 2 : 1)).toFixed(2));
    setSelectedGST(gstType);
    closeGSTModal();
  };
  
  

  const handleSubmit = () => {
    const updatedInvoiceData = {
      invoiceNumber,
      date:currentDate,
      rows,
      subtotal,
      grandTotal,
      gstValues,
      gstPercent,
      customerDetails,
      selectedGST
    };
    
    navigate('/onsubmit', { state: { invoiceData: updatedInvoiceData, subtotal, grandTotal, gstValues, customerDetails, gstPercent, selectedGST} });
  };

  const handleBack = () => {
    onResetRows();
    navigate('/');
  };
  const handleSelect = (e) => { handleGSTSelection(e.target.value); };
  
  const handleCustomerDetailsChange = (e) => { 
    const { name, value } = e.target; 
    if (name === 'gstNo' && value) { 
      const existingCustomerData = localStorage.getItem(`customer_${value}`); 
      if (existingCustomerData) { const customerData = JSON.parse(existingCustomerData); 
      setCustomerDetails((prevDetails) => ({
         ...prevDetails, 
         detail: customerData.detail, gstNo: customerData.gstNo })); return; } }
          setCustomerDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
          if (name === 'date') 
            { setCurrentDate(value); }
         };
  const handleKeyPress = (e, ref) => {
     if (e.key === 'Enter') { 
      e.preventDefault(); 
      ref.current?.focus(); } 
    };
    useEffect(() => { handleGSTSelection(selectedGST); // Ensure GST is calculated initially }, 
}, [subtotal]);
  
  


  return (
    
    <div className='a4-page'>
       
      <div className='webpage'>
        
       
        <main>
        <div className='navinvoice'>
        <br/>
        
          <div className='search'><Link to="/search">Search Invoices</Link></div>
          <br/>
        
        <div className='view'> <Link to="/listinvoices">View All Saved Invoices</Link> </div>
        
        </div>
        
        
        <br></br>
          <div className='main'>
            <div>
              <h4 className='tax'>Tax Invoice</h4>
            </div>
            <div>
                <form className='form'>
                    <div className='formmain'>
                    <div>
                    <div> <label className='date'>Invoice Date: </label> 
                    <input type='date' name='date' value={currentDate} onChange={handleCustomerDetailsChange}></input>
                     </div>
                        
                        
                    </div>
                    <div>
                    <label className='no'>Invoice No.: {invoiceNumber}</label>
                    </div>
                    <div>
                        <label>Quote No.</label>
                        <input type='text' name='quoteNo' value={customerDetails.quoteNo} onChange={handleCustomerDetailsChange} onKeyPress={(e) => handleKeyPress(e, detailRef)}></input>
                    </div>
                    <div>
                        <label>Customer detail</label>
                        <textarea name='detail' ref={detailRef} value={customerDetails.detail} onChange={handleCustomerDetailsChange} onKeyPress={(e) => handleKeyPress(e, poNoRef)} />

                    </div>
                    <div>
                        <label>PO NO</label>
                        <input type='text' name='poNo' ref={poNoRef} value={customerDetails.poNo} onChange={handleCustomerDetailsChange} onKeyPress={(e) => handleKeyPress(e, poDateRef)}></input>
                    </div>
                    <div>
                        <label>PO Date</label>
                        <input type='date' name='poDate' ref={poDateRef} value={customerDetails.poDate} onChange={handleCustomerDetailsChange} onKeyPress={(e) => handleKeyPress(e, gstNoRef)}></input>
                    </div>
                    <div>
                        <label>GST NO.</label>
                        <input type='text' name='gstNo' ref={gstNoRef} value={customerDetails.gstNo} onChange={handleCustomerDetailsChange} onKeyPress={(e) => handleKeyPress(e, AddbtnRef)}></input>
                    </div>
                    </div>
                </form>
            </div>
            <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
            <div className='button'>
              <button onClick={() => setAddProductOpen(true)} ref={AddbtnRef}>Add</button>
              {addProductOpen && (
                <Addproduct
                  onSubmit={handleAddProduct}
                  onClose={() => setAddProductOpen(false)}
                  defaultValue={rowToEdit !== null ? rows[rowToEdit] : {}}
                />
              )}
            </div>
          </div>
          
          <div className='total-sub'>
            <label>Subtotal:- </label>
            {subtotal}
          </div>
          <div className='gst-select'> <label>GST Type:</label> 
          <select onChange={handleSelect}> 
            <option value="CGST_SGST">CGST/SGST</option> 
            <option value="IGST">IGST</option> 
            </select> 
            </div>
            <div className='table-gst'>

            <table > {selectedGST === 'CGST_SGST' && ( <> 
            <tr> 
              <th>CGST {`${(gstPercent / 2).toFixed(2)} %`}</th> 
              <td>{gstValues.CGST || '--'}</td> 
              </tr> 
              <tr> 
                <th>SGST {`${(gstPercent / 2).toFixed(2)} %`}</th> 
                <td>{gstValues.SGST || '--'}</td> 
                </tr> </> )} 
                {selectedGST === 'IGST' && ( 
                  <tr> 
                    <th>IGST {`${gstPercent.toFixed(2)} %`}</th>
                     <td>{gstValues.IGST || '--'}</td> 
                     </tr> )} 
                     </table>
                     </div>
            
            <div className='total-sub'> <label>Grand Total:- </label> {grandTotal} </div>
            
          <div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          <div>
            <button onClick={handleBack}>Back</button>
          </div>
        </main>
        
        
      </div>
      <div>
        <br/>
        <br/>
        
      </div>
      
    </div>
    
  );
};

export default Invoice;
