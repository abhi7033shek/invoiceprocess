import React, { useState } from 'react';
import './GSTModal.css';

const GSTModal = ({ isOpen, onClose, onSelectGST }) => {
  const [selectedGST, setSelectedGST] = useState('');

  const handleSelect = (gstType) => {
    setSelectedGST(gstType);
  };

  const handleSubmit = () => {
    onSelectGST(selectedGST);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select GST Type</h2>
        <button onClick={() => handleSelect('IGST')}>IGST</button>
        <button onClick={() => handleSelect('CGST_SGST')}>CGST & SGST</button>
        <button onClick={handleSubmit}>Apply</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default GSTModal;