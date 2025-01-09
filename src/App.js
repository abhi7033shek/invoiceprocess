import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Component/Nav';
import Invoice from './Component/Invoice';
import OnSubmit from './Component/OnSubmit';
import SearchInvoice from './Component/searchInvoice';
import ListInvoices from './Component/ListInvoices';
import ViewInvoices from './Component/ViewInvoices';
import AddProductinstock from './Component/Stock/AddProductinstock';





function App() {
  const [rows, setRows] = useState([]);

  const handleAddRow = (newRow) => {
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  const handleEditRow = (index, updatedRow) => {
    setRows(rows.map((row, idx) => (idx === index ? updatedRow : row)));
  };
  const handleResetRows = () => { setRows([]); };

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nav/>}/>
        <Route path='/invoice' element={<Invoice  rows={rows}
              onAddRow={handleAddRow}
              onDeleteRow={handleDeleteRow}
              onEditRow={handleEditRow}
              onResetRows={handleResetRows}/>}/>
        <Route path='/onsubmit' element={<OnSubmit rows={rows}/>}/>
        <Route path='/search' element={<SearchInvoice/>}/>
        <Route path='/listinvoices' element={<ListInvoices/>}/>
        <Route path='/viewinvoices' element={<ViewInvoices/>}/>
        <Route path='/addproductinstock' element={<AddProductinstock/>}/>
        

      </Routes>
      </BrowserRouter>
   
  

    </div>
  );
}

export default App;
