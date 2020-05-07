import React from 'react';
import { useLocation } from 'react-router-dom';
import headerStyles from './header.module.scss';
import LoginOutButton from '../loginOutButton';

const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className={`${headerStyles.header} ${headerStyles.sidebarHeader}`}>
        sdfa
      </div>
      <div className={`${headerStyles.header} ${headerStyles.headerContent}`}>
        <div className={headerStyles.headerTitle}>
          {location.pathname}
        </div>
        <div className={headerStyles.headerAccount}>
          <LoginOutButton />
        </div>
      </div>
    </>
  )
}

export default Header;