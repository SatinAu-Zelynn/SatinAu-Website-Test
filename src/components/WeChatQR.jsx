import React from 'react';

const WeChatQR = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <>
      <div 
        id="wechatOverlay" 
        className={`overlay ${show ? 'show' : ''}`}
        onClick={onClose}
      />
      <div id="wechatQR" className={`modal wechat-qr ${show ? 'show' : ''}`}>
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https://u.wechat.com/MASBAq1qageU9c51LoYg2-Q?s=2" 
          alt="WeChat QR" 
        />
        <p>微信扫码加我（若未显示二维码请多次刷新重试，微信仅允许二维码名片，程序会自动将地址转为二维码）</p>
      </div>
    </>
  );
};

export default WeChatQR;