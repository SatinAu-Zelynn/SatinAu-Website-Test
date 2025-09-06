import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './routes/HomePage';
import ZelynnPage from './routes/ZelynnPage';
import BlogPage from './routes/BlogPage';
import BottomNav from './components/BottomNav';
import { applyCssVersion } from './utils/helpers';
import './styles/global.css';

// 页面切换动画包装组件
const PageTransition = ({ children }) => {
  const location = useLocation();
  const [transitionClass, setTransitionClass] = useState('');
  const pageRef = useRef(null);

  useEffect(() => {
    // 获取上一个路径（从sessionStorage）
    const fromPath = sessionStorage.getItem('fromPath') || '/';
    const toPath = location.pathname;
    
    // 计算过渡类
    const ORDER = ['/', '/blog', '/zelynn'];
    const fromIdx = ORDER.indexOf(fromPath);
    const toIdx = ORDER.indexOf(toPath);
    
    if (fromIdx !== -1 && toIdx !== -1) {
      const newClass = toIdx > fromIdx ? 'slide-in-right' : 'slide-in-left';
      setTransitionClass(newClass);
      
      // 动画结束后移除类
      const handleAnimationEnd = () => {
        setTransitionClass('');
      };
      
      if (pageRef.current) {
        pageRef.current.addEventListener('animationend', handleAnimationEnd, { once: true });
        return () => {
          pageRef.current.removeEventListener('animationend', handleAnimationEnd);
        };
      }
    }
    
    // 保存当前路径到sessionStorage
    sessionStorage.setItem('fromPath', toPath);
  }, [location.pathname]);

  return (
    <div 
      ref={pageRef}
      className={`page-container ${transitionClass}`}
    >
      {children}
    </div>
  );
};

// 样式切换组件
const StyleSwitcher = () => {
  const [selectedStyle, setSelectedStyle] = useState('sainau');

  useEffect(() => {
    // 从localStorage加载保存的样式
    const savedStyle = localStorage.getItem('preferredStyle') || 'sainau';
    setSelectedStyle(savedStyle);
    applyCssVersion(savedStyle);
  }, []);

  const handleStyleChange = (e) => {
    const style = e.target.value;
    setSelectedStyle(style);
    applyCssVersion(style);
  };

  return (
    <div className="style-switcher">
      <label>
        <input
          type="radio"
          name="style"
          value="sainau"
          checked={selectedStyle === 'sainau'}
          onChange={handleStyleChange}
        />
        SainAu Design
      </label>
      <label>
        <input
          type="radio"
          name="style"
          value="fluent"
          checked={selectedStyle === 'fluent'}
          onChange={handleStyleChange}
        />
        Microsoft Fluent
      </label>
      <label>
        <input
          type="radio"
          name="style"
          value="material"
          checked={selectedStyle === 'material'}
          onChange={handleStyleChange}
        />
        Google Material
      </label>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route 
            path="/" 
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            } 
          />
          <Route 
            path="/zelynn" 
            element={
              <PageTransition>
                <ZelynnPage />
              </PageTransition>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <PageTransition>
                <BlogPage />
              </PageTransition>
            } 
          />
        </Routes>
        <BottomNav />
        <StyleSwitcher />
      </div>
    </Router>
  );
};

export default App;