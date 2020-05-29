import React from 'react';

import LoginOutButton from '../loginOutButton';
import headerStyles from './header.module.scss';

const Header = () => (
  <header className={headerStyles.headerContent}>
    <div className={headerStyles.headerRight}>
      <LoginOutButton />
    </div>
  </header>
);

export default Header;
