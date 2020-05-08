import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme } from '@material-ui/core/styles';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';

const sidebarWidth = 200;

const useStyles = makeStyles((theme: Theme) => ({
  expandedMargin: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: sidebarWidth,
  },
  contractedMargin: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: 0,
  },
  sizeSidebar: {
    width: sidebarWidth,
  },
}));

const SidebarButton = ({ name, endpoint }: SidebarOption) => (
  <NavLink
    key={name}
    to={`/${endpoint}`}
    className={clsx(sidebarStyles.menuOption, useStyles().sizeSidebar)}
    activeClassName={sidebarStyles.selectedMenuOption}>
    {name}
  </NavLink>
);

const getButtons = (options: SidebarOption[]) =>
  options.map(({ name, endpoint }) => (
    <SidebarButton name={name} endpoint={endpoint} />
  ));

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className={clsx(sidebarStyles.margin, useStyles().expandedMargin, {
          [useStyles().contractedMargin]: !open,
        })}>
        <MenuIcon onClick={handleOpen} />
      </div>
      <Drawer
        className={sidebarStyles.sidebar}
        variant="persistent"
        anchor="left"
        open={open}>
        <div className={sidebarStyles.sidebarHeader}>
          <ChevronLeftIcon onClick={handleClose} />
        </div>
        <Divider />
        <nav className={sidebarStyles.container}>
          {getButtons(sidebarOptions)}
        </nav>
      </Drawer>
    </>
  );
};

export default Sidebar;
