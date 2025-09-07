import React from 'react';
import { copyToClipboard } from '../utils/helpers';

const EmailPopup = ({ show, onClose, onCopySuccess }) => {
  const emails = [
    'mifanz090820@outlook.com',
    'mifanz090820@gmail.com'
  ];

  const handleCopy = async (email) => {
    const success = await copyToClipboard(email);
    if (success) onCopySuccess(email);
  };

  if (!show) return null;

  return (
    <>
      <div 
        id="emailOverlay" 
        className={`overlay ${show ? 'show' : ''}`}
        onClick={onClose}
      />
      <div id="emailPopup" className={`modal ${show ? 'show' : ''}`}>
        <p>请选择邮箱地址</p>
        <div className="email-list">
          {emails.map((email, idx) => (
            <div key={idx} className="email-item">
              <span>{email}</span>
              <button onClick={() => handleCopy(email)}>复制</button>
            </div>
          ))}
        </div>
        <div className="actions">
          <button className="cancel" onClick={onClose}>关闭</button>
        </div>
      </div>
    </>
  );
};

export default EmailPopup;