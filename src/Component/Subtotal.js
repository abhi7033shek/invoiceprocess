import React from 'react'
import './Invoice.css'

export default function Subtotal({ subtotal, grandTotal, gstValues, gstPercent, selectedGST }) {
    
  
    
  return (
    <div>
    <table className="subtotal-table">
        <thead>
            <tr>
                <th>Subtotal</th>
                <td>{subtotal}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Shipping</th>
                <td>--</td> 
            </tr>
            <tr>
                <th>SGST {selectedGST === 'CGST_SGST' ? `${(gstPercent / 2).toFixed(2)} %` : ' '}  </th>
                <td>{gstValues.SGST || '--'}</td>
            </tr>
            <tr>
                <th>CGST {selectedGST === 'CGST_SGST' ? `${(gstPercent / 2).toFixed(2)} %` : ' '} </th>
                <td>{gstValues.CGST || '--'}</td>
            </tr>
            <tr>
                <th>IGST {selectedGST === 'IGST' ? `${gstPercent.toFixed(2)} %` : ' '} </th>
                <td>{gstValues.IGST || '--'}</td>
            </tr>
            <tr>
                <th>Grand Total</th>
                <td>{grandTotal}</td>
            </tr>
        </tbody>
    </table>
    
    </div>
    
    
  )
}
