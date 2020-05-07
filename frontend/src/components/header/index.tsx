import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import headerStyles from './header.module.scss';
import LoginOutButton from '../loginOutButton';

const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className={`${headerStyles.header} ${headerStyles.sidebarHeader}`}>
        <ChevronLeftIcon />
      </div>

      <div className={`${headerStyles.header} ${headerStyles.headerContent}`}>
        <div className={headerStyles.headerLeft}>
          <MenuIcon />
        </div>
        <div className={headerStyles.headerMiddle}>{location.pathname}</div>
        <div className={headerStyles.headerRight}>
          <LoginOutButton />
        </div>
      </div>
    </>
  );
};

export default Header;
