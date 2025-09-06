import React, { useEffect, useRef } from 'react';

const ZelynnPage = () => {
  const langCardsRef = useRef([]);

  // 卡片入场动画
  useEffect(() => {
    const observers = [];
    
    langCardsRef.current.forEach((card, index) => {
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

  // 语言卡片数据
  const langCards = [
    {
      title: '语言',
      value: '简体中文',
      icon: <span className="paw-pink">🐾</span>,
      url: 'https://www.kdocs.cn/l/cbnmJFr498XG'
    },
    {
      title: '語言',
      value: '繁體中文',
      icon: <span className="paw-purple">🐾</span>,
      url: 'https://www.kdocs.cn/l/caB01lLIj8q2'
    },
    {
      title: 'Language',
      value: 'English',
      icon: <span className="paw-cyan">🐾</span>,
      url: 'https://www.kdocs.cn/l/cjSN22oChlaT'
    }
  ];

  return (
    <main className="page zelynn-page">
      <header>
        <h1>泽凌Zelynn</h1>
      </header>

      <section>
        <h2>设定总览 / Character Overview</h2>
        <div className="lang-wrapper">
          {langCards.map((card, idx) => (
            <a
              key={idx}
              ref={el => langCardsRef.current[idx] = el}
              className="contact-card"
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="icon">{card.icon}</div>
              <div className="text">
                <div className="label">{card.title}</div>
                <div className="value">{card.value}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer>
        <p>
          © 2025 缎金SatinAu 保留所有权利。 
          <a href="https://www.kdocs.cn/l/chC750lu9LQC" target="_blank" rel="noopener noreferrer">问题反馈</a>
        </p>
      </footer>
    </main>
  );
};

export default ZelynnPage;