import React from "react";
import "./GlModal.css";

function GlModal({ isOpen = false, onClose = () => {}, title, children }) {
  return (
    <>
      {isOpen}
      {isOpen == true && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{title}</h2>
              <button className="modal-close" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default GlModal;
