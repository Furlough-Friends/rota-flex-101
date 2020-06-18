import React from 'react';

import LoginOutButton from '../LoginOutButton';
import headerStyles from './header.module.scss';
import { useAuth0 } from '../../auth0Spa';

const Header = () => {
  const { user } = useAuth0();
  return (
    <header className={headerStyles.headerContent}>
      <div className={headerStyles.headerRight}>
        <p className={headerStyles.userName}>{user && user.nickname}</p>
        <LoginOutButton />
      </div>
    </header>
  );
};

export default Header;
