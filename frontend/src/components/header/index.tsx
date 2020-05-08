import React, { CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import headerStyles from './header.module.scss';
import LoginOutButton from '../loginOutButton';
import { SidebarControls } from '../home';
import { SIDEBAR_STATES } from '../../constants/sidebarOptions';

const Header = ({ sidebarControls }: { sidebarControls: SidebarControls }) => {
  const location = useLocation();

  const openSidebarButtonStyle: CSSProperties =
    sidebarControls.state !== SIDEBAR_STATES.CLOSED
      ? {}
      : { visibility: 'hidden' };
  const closeSidebarButtonStyle: CSSProperties =
    sidebarControls.state !== SIDEBAR_STATES.CLOSED
      ? { visibility: 'hidden' }
      : {};

  return (
    <>
      <div className={`${headerStyles.header} ${headerStyles.sidebarHeader}`}>
        <ChevronLeftIcon
          onClick={sidebarControls.handleClose}
          style={openSidebarButtonStyle}
        />
      </div>
      <div className={`${headerStyles.header} ${headerStyles.headerContent}`}>
        <div className={headerStyles.headerLeft}>
          <MenuIcon
            onClick={sidebarControls.handleOpen}
            style={closeSidebarButtonStyle}
          />
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
