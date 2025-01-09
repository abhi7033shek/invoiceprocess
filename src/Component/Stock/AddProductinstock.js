import React, { useState, useEffect } from 'react';
import './AddProduct.css';

export default function AddProductInStock() {
  const [products, setProducts] = useState([
    { id: 1, category: 'Antivirus pro advance', subscription: '1 pc/1 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 2, category: 'Antivirus pro advance', subscription: '1 pc/3 years', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 3, category: 'Antivirus pro advance', subscription: '3 pc/1 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 4, category: 'Antivirus pro advance', subscription: '3 pc/3 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 5, category: 'Antivirus pro advance', subscription: '10 pc/1 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 6, category: 'Antivirus pro advance', subscription: '10 pc/3 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 7, category: 'Total shield', subscription: '1 pc/1 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 8, category: 'Total shield', subscription: '1 pc/3 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 9, category: 'Total shield', subscription: '3 pc/1 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 10, category: 'Total shield', subscription: '3 pc/3 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 11, category: 'Total shield', subscription: '10 pc/1 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 12, category: 'Total shield', subscription: '10 pc/3 year', qty: '', sold: 0, inStock: '', hsn: '8234' },
    { id: 13, category: 'Antivirus server edition', subscription: '1 server/3 users', qty: '', sold: 0, inStock: '', hsn: '8234' },
  ]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleUpdate = (id, name, value) => {
    const updatedValue = value ? parseInt(value, 10) : 0;

    const updatedProducts = products.map(product =>
      product.id === id ? { 
        ...product, 
        [name]: updatedValue, 
        inStock: name === 'qty' ? updatedValue - product.sold : product.qty - updatedValue 
      } : product
    );

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    
  };
  const updateSoldData = (id, qty) => { const updatedProducts = products.map(product => product.id === id ? { ...product, sold: product.sold + qty, inStock: product.qty - (product.sold + qty) } : product ); setProducts(updatedProducts); localStorage.setItem('products', JSON.stringify(updatedProducts)); };

  

 

  const renderRows = (category) => {
    return products
      .filter(product => product.category === category)
      .map((product) => (
        <tr key={product.id}>
          <td>{product.subscription}</td>
          <td>
            <input
              type="number"
              value={product.qty}
              onChange={(e) => handleUpdate(product.id, 'qty', e.target.value)}
            />
          </td>
          <td>
            <input
              type="number"
              value={product.sold}
              onChange={(e) => handleUpdate(product.id, 'sold', e.target.value)}
            />
          </td>
          <td>{product.inStock}</td>
        </tr>
      ));
  };

  return (
    <div className="dp">
      <table>
        <thead>
          <tr>
            <th>Quick Heal</th>
            <th>QTY</th>
            <th>Sold</th>
            <th>In stock</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan="5">Antivirus</th>
          </tr>
          {renderRows('Antivirus')}
          <tr>
            <th colSpan="5">Total shield</th>
          </tr>
          {renderRows('Total shield')}
          <tr>
            <th colSpan="5">Antivirus server</th>
          </tr>
          {renderRows('Antivirus server')}
        </tbody>
      </table>
      
    </div>
  );
}
