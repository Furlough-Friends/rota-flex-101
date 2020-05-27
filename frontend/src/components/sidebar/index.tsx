import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import sidebarStyles from './sidebar.module.scss';
import {
  SidebarOption,
  SideberButtonConfig,
} from '../../constants/sidebarOptions';
import { WINDOW_WIDTH_THRESHOLD } from '../../constants/global';

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

const windowSizeHookOptions = { fps: 45, leading: true };

const SidebarButton = ({
  name,
  endpoint,
  isWindowBig,
}: SideberButtonConfig) => (
  <NavLink
    key={name}
    to={`/${endpoint}`}
    className={clsx(sidebarStyles.menuOption, {
      [useStyles().sizeSidebar]: isWindowBig,
    })}
    activeClassName={sidebarStyles.selectedMenuOption}>
    {name}
  </NavLink>
);

const getButtons = (options: SidebarOption[], isWindowBig: boolean) =>
  options.map(({ name, endpoint }) => (
    <SidebarButton
      key={name}
      name={name}
      endpoint={endpoint}
      isWindowBig={isWindowBig}
    />
  ));

interface SidebarProps {
  sidebarOptions: SidebarOption[];
}

const Sidebar = ({ sidebarOptions }: SidebarProps) => {
  const widthHookReturnValue = useWindowWidth(windowSizeHookOptions);

  const isWindowBig =
    widthHookReturnValue !== undefined
      ? widthHookReturnValue >= WINDOW_WIDTH_THRESHOLD
      : true;

  const [open, setOpen] = useState(isWindowBig);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const drawerAnchor = isWindowBig ? 'left' : 'top';

  const drawerVariant = isWindowBig ? 'persistent' : 'temporary';

  const openMenuButton = () =>
    isWindowBig ? (
      <KeyboardArrowLeft onClick={handleClose} />
    ) : (
      <KeyboardArrowUp onClick={handleClose} />
    );

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
        variant={drawerVariant}
        anchor={drawerAnchor}
        open={open}
        hideBackdrop>
        <div className={sidebarStyles.sidebarHeader}>{openMenuButton()}</div>
        <Divider />
        <nav className={sidebarStyles.container}>
          {getButtons(sidebarOptions, isWindowBig)}
        </nav>
      </Drawer>
    </>
  );
};

export default Sidebar;
