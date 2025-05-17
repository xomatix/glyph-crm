import React from "react";
import "./GlModal.css";
import { Modal } from "@mui/material";
import GlButton from "../GlButton/GlButton";

function GlModal({ isOpen = false, onClose = () => {}, title, children }) {
  return (
    <>
      {isOpen ? "tak" : "nie"}
      {isOpen == true && (
        <Modal
          open={isOpen}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-box">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">{title}</div>
                <GlButton className="modal-close" action={onClose}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </GlButton>
              </div>
              {children}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default GlModal;
