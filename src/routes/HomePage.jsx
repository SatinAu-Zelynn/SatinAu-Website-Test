import React, { useState, useEffect, useRef } from 'react';
import EmailPopup from '../components/EmailPopup';
import WeChatQR from '../components/WeChatQR';
import IosAlert from '../components/IosAlert';
import Toast from '../components/Toast';

const HomePage = () => {
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showWeChatQR, setShowWeChatQR] = useState(false);
  const [showIosAlert, setShowIosAlert] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [pendingUrl, setPendingUrl] = useState('');
  const contactCardsRef = useRef([]);

  // 卡片入场动画
  useEffect(() => {
    const observers = [];
    
    contactCardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.animationDelay = `${0.2 + index * 0.2}s`;
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      
      observer.observe(card);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // 处理外部链接弹窗
  const handleExternalLink = (url, msg) => {
    setPendingUrl(url);
    setShowIosAlert(true);
  };

  // 确认跳转
  const confirmIosAlert = () => {
    if (pendingUrl) window.open(pendingUrl, '_blank');
    setShowIosAlert(false);
    setPendingUrl('');
  };

  // 复制成功回调
  const handleCopySuccess = (email) => {
    setToastMsg(`📋 已复制: ${email}`);
    setShowToast(true);
    setShowEmailPopup(false);
  };

  // 联系卡片数据
  const contactCards = [
    {
      title: '邮箱',
      value: '点击选择邮箱',
      icon: <svg viewBox="0 0 24 24"><path d="M20 4H4v16h16V4zm0 4-8 5-8-5"/></svg>,
      onClick: () => setShowEmailPopup(true)
    },
    {
      title: 'QQ',
      value: '2668588966',
      icon: <img src="/source/ico/favicon_qq.ico" alt="QQ"/>,
      onClick: () => handleExternalLink('https://qm.qq.com/q/WTOl1Swrqa', '是否跳转到 QQ？')
    },
    {
      title: '微信',
      value: '扫码加我',
      icon: <img src="/source/ico/favicon_wechat.ico" alt="WeChat"/>,
      onClick: () => setShowWeChatQR(true)
    },
    {
      title: '哔哩哔哩',
      value: 'bilibili.com',
      icon: <img src="/source/ico/favicon_bilibili.ico" alt="Bilibili"/>,
      onClick: () => handleExternalLink('https://space.bilibili.com/1502522588', '是否跳转到 哔哩哔哩？')
    },
    {
      title: '酷安',
      value: 'coolapk.com',
      icon: <img src="/source/ico/favicon_coolapk.ico" alt="Coolapk"/>,
      onClick: () => handleExternalLink('http://www.coolapk.com/u/3561588', '是否跳转到 酷安？')
    },
    {
      title: '微博',
      value: 'weibo.com',
      icon: <img src="/source/ico/favicon_weibo.ico" alt="Weibo"/>,
      onClick: () => handleExternalLink('https://weibo.com/u/7452701895', '是否跳转到 微博？')
    },
    {
      title: '小红书',
      value: 'xiaohongshu.com',
      icon: <img src="/source/ico/favicon_xiaohongshu.ico" alt="Xiaohongshu"/>,
      onClick: () => handleExternalLink('https://www.xiaohongshu.com/user/profile/5e950c600000000001009b54', '是否跳转到 小红书？')
    },
    {
      title: '知乎',
      value: 'zhihu.com',
      icon: <img src="/source/ico/favicon_zhihu.ico" alt="Zhihu"/>,
      onClick: () => handleExternalLink('https://www.zhihu.com/people/31-87-23-61', '是否跳转到 知乎？')
    }
  ];

  return (
    <main className="page index-page">
      <header>
        <div className="title-row">
          <h1>缎金</h1>
          <picture>
            <source srcset="/source/png/SatinAu_v3_White.png" media="(prefers-color-scheme: dark)"/>
            <img src="/source/png/SatinAu_v3_Black.png" alt="SatinAu Logo"/>
          </picture>
        </div>
      </header>

      <section>
        <p>促成大自由中之社会进步及较善之民生</p>
        <p>To promote social progress and better standards of life in larger freedom</p>
      </section>

      <section>
        <h2>联系方式 / Contact Information</h2>
        <div className="contact-wrapper">
          {contactCards.map((card, idx) => (
            <div
              key={idx}
              ref={el => contactCardsRef.current[idx] = el}
              className="contact-card"
              onClick={card.onClick}
            >
              <div className="icon">{card.icon}</div>
              <div className="text">
                <div className="label">{card.title}</div>
                <div className="value">{card.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>
          © 2025 缎金SatinAu 保留所有权利。 
          <a href="https://www.kdocs.cn/l/chC750lu9LQC" target="_blank" rel="noopener noreferrer">问题反馈</a>
        </p>
      </footer>

      {/* 弹窗组件 */}
      <EmailPopup 
        show={showEmailPopup} 
        onClose={() => setShowEmailPopup(false)}
        onCopySuccess={handleCopySuccess}
      />
      <WeChatQR 
        show={showWeChatQR} 
        onClose={() => setShowWeChatQR(false)}
      />
      <IosAlert 
        show={showIosAlert} 
        message="是否跳转到外部链接？"
        onConfirm={confirmIosAlert}
        onCancel={() => setShowIosAlert(false)}
      />
      <Toast show={showToast} message={toastMsg} />
    </main>
  );
};

export default HomePage;