import React, { useState, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';

const SidebarButton = ({
  name,
  endpoint,
}: {
  name: string;
  endpoint: string;
}) => (
  <NavLink
    key={name}
    to={`/${endpoint}`}
    className={`${sidebarStyles.menuOption}`}
    activeClassName={`${sidebarStyles.selectedMenuOption}`}>
    {name}
  </NavLink>
);

const getButtons = (options: SidebarOption[]) =>
  options.map(({ name, endpoint }) => (
    <SidebarButton name={name} endpoint={endpoint} />
  ));

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  const handleClose = () => {
    setIsChanging(true);
      
    setIsOpen(false);
    setIsChanging(false);
  };

  const handleOpen = () => {
    setIsChanging(true);

    setIsOpen(true);
    setIsChanging(false);
  };

  const style: CSSProperties =
    isOpen || isChanging ? {} : {
      transition: '1s',
      // transform: 'translateX(-200px)',
      width: 1,
    };

  const openSidebarButtonStyle: CSSProperties =
    isOpen || isChanging ? {} : { display: 'none' };

  const closeSidebarButtonStyle: CSSProperties =
    isOpen || isChanging ? { display: 'none' } : {transform: 'translate(2.5rem)'};

  return (
    <div className={sidebarStyles.column} style={style}>
      <div className={sidebarStyles.sidebarHeader}>
        <div className={sidebarStyles.headerButtons}>
          <ChevronLeftIcon onClick={handleClose} style={openSidebarButtonStyle} />
          <MenuIcon onClick={handleOpen} style={closeSidebarButtonStyle} />
        </div>
      </div>
      <nav className={sidebarStyles.container}>
        {getButtons(sidebarOptions)}
      </nav>
    </div>
  );
};

export default Sidebar;
