import React from 'react';

const IosAlert = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <>
      <div 
        id="iosOverlay" 
        className={`overlay ${show ? 'show' : ''}`}
        onClick={onCancel}
      />
      <div id="iosAlert" className={`modal ios-alert ${show ? 'show' : ''}`}>
        <p id="iosAlertMsg">{message || '是否跳转到外部链接？'}</p>
        <div className="actions">
          <button className="cancel" onClick={onCancel}>取消</button>
          <button className="confirm" onClick={onConfirm}>确定</button>
        </div>
      </div>
    </>
  );
};

export default IosAlert;