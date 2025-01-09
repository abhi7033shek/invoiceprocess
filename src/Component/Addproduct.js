import React, { useState } from 'react';
import './Addproduct.css';

export const Addproduct = ({ onClose, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(defaultValue || {
    partno: '',
    hsncode: '',
    qty: '',
    unitprice: '',
    taxpercent: '',
    linetotal: '',
  });
  const [errors, setErrors] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const productData = [
    { id: 1, hsncode: '8234', partno: 'Antivirus pro advance 1 pc/1 year', description: 'Antivirus pro advance 1 pc/1 year' },
    { id: 2, hsncode: '8234', partno: 'Antivirus pro advance 1 pc/3 year', description: 'Antivirus pro advance 1 pc/3 year' },
    { id: 3, hsncode: '8234', partno: 'Antivirus pro advance 3 pc/1 year', description: 'Antivirus pro advance 3 pc/1 year' },
    { id: 4, hsncode: '8234', partno: 'Antivirus pro advance 3 pc/3 year', description: 'Antivirus pro advance 3 pc/3 year' },
    { id: 5, hsncode: '8234', partno: 'Antivirus pro advance 10 pc/1 year', description: 'Antivirus pro advance 10 pc/1 year' },
    { id: 6, hsncode: '8234', partno: 'Antivirus pro advance 10 pc/3 year', description: 'Antivirus pro advance 10 pc/3 year' },
    { id: 7, hsncode: '8234', partno: 'Total shield 1 pc/1 year', description: 'Total shield 1 pc/1 year' },
    { id: 8, hsncode: '8234', partno: 'Total shield 1 pc/3 year', description: 'Total shield 1 pc/3 year' },
    { id: 9, hsncode: '8234', partno: 'Total shield 3 pc/1 year', description: 'Total shield 3 pc/1 year' },
    { id: 10, hsncode: '8234', partno: 'Total shield 3 pc/3 year', description: 'Total shield 3 pc/3 year' },
    { id: 11, hsncode: '8234', partno: 'Total shield 10 pc/1 year', description: 'Total shield 10 pc/1 year' },
    { id: 12, hsncode: '8234', partno: 'Total shield 10 pc/3 year', description: 'Total shield 10 pc/3 year' },
    { id: 13, hsncode: '8234', partno: 'Antivirus server edition 1 server/3 user', description: 'Antivirus server edition 1 server/3 user' },
  ];

  const validateForm = () => {
    if (formState.partno && formState.hsncode && formState.qty && formState.unitprice && formState.taxpercent) {
      setErrors('');
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(', '));
      return false;
    }
  };

  const handleHSNChange = (e) => {
    const { value } = e.target;
    setFormState({ ...formState, hsncode: value });

    const matches = productData.filter(product => product.hsncode === value);
    setFilteredProducts(matches);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const product = productData.find(p => p.partno === formState.partno); 
    if (product) {

      onSubmit({ 
        id: product.id, qty: parseInt(formState.qty, 10) }); }

   

   
   
    onSubmit(formState);
    onClose();
  };

  
  

  return (
    <div className="modal-container" onClick={(e) => { if (e.target.className === 'modal-container') onClose(); }}>
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="hsncode">HSN Code</label>
            <input name="hsncode" type="number" onChange={handleHSNChange} value={formState.hsncode} />
          </div>
          {filteredProducts.length > 0 && (
            <div className="form-group">
              <label htmlFor="partno">Select Part No.</label>
              <select name="partno" onChange={handleChange} value={formState.partno}>
                <option value="">Select a product</option>
                {filteredProducts.map(product => (
                  <option key={product.partno} value={product.partno}>
                    {product.description}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="qty">Qty</label>
            <input type='number' name='qty' onChange={handleChange} value={formState.qty} />
          </div>
          <div className='form-group'>
            <label htmlFor='unitprice'>Unit price</label>
            <input type='number' name='unitprice' onChange={handleChange} value={formState.unitprice} />
          </div>
          <div className='form-group'>
            <label htmlFor='taxpercent'>Tax in %</label>
            <input type='number' name='taxpercent' onChange={handleChange} value={formState.taxpercent} />
          </div>

          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
};
