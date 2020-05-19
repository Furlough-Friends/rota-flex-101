import React from 'react';
import headerStyles from './header.module.scss';
import LoginOutButton from '../loginOutButton';

const Header = () => {
  return (
    <header className={headerStyles.headerContent}>
      <div className={headerStyles.headerRight}>
        <LoginOutButton />
      </div>
    </header>
  );
};

export default Header;
