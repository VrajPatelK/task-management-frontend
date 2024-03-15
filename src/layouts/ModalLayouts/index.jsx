import React from "react";
import "./ModalLayouts.css";

const ModalLayouts = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-layout" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default ModalLayouts;
