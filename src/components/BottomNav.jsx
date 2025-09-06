import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 页面切换动画处理
  const handleNavClick = (toPath, e) => {
    if (location.pathname === toPath) return;
    
    const currentPage = document.querySelector('.page');
    if (currentPage) {
      const ORDER = ['/', '/blog', '/zelynn'];
      const fromIdx = ORDER.indexOf(location.pathname);
      const toIdx = ORDER.indexOf(toPath);
      
      // 添加退出动画
      currentPage.classList.add(toIdx > fromIdx ? 'slide-out-left' : 'slide-out-right');
      
      // 动画结束后跳转
      setTimeout(() => {
        navigate(toPath);
      }, 500);
      
      e.preventDefault();
    }
  };

  const navItems = [
    { path: '/', cn: '缎金', en: 'SatinAu' },
    { path: '/blog', cn: '博客', en: 'Blog' },
    { path: '/zelynn', cn: '泽凌', en: 'Zelynn' }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.path}
          className={({ isActive }) => isActive ? 'active' : ''}
          onClick={(e) => handleNavClick(item.path, e)}
        >
          <span className="nav-cn">{item.cn}</span>
          <span className="nav-en">{item.en}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;