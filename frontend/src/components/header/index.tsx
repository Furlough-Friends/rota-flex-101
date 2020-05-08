import React from 'react';
import { useLocation } from 'react-router-dom';
import headerStyles from './header.module.scss';
import LoginOutButton from '../loginOutButton';

const Header = () => {
  const location = useLocation();

  return (
    <header className={headerStyles.headerContent}>
      <div className={headerStyles.headerMiddle}>{location.pathname}</div>
      <div className={headerStyles.headerRight}>
        <LoginOutButton />
      </div>
    </header>
  );
};

export default Header;
