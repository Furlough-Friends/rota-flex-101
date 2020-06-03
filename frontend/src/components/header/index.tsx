import React from 'react';

import LoginOutButton from '../LoginOutButton';
import headerStyles from './header.module.scss';

const Header = () => (
  <header className={headerStyles.headerContent}>
    <div className={headerStyles.headerRight}>
      <LoginOutButton />
    </div>
  </header>
);

export default Header;
