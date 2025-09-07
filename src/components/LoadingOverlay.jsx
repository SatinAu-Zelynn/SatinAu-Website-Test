import React from 'react';

const LoadingOverlay = ({ show }) => {
  if (!show) return null;
  
  return (
    <div id="loadingOverlay" className={`overlay ${show ? 'show' : ''}`}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40px',
        height: '40px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid #fff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}>
        <style jsx global>{`
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingOverlay;