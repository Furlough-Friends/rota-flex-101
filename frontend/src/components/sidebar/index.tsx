import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, Theme } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import MenuIcon from '@material-ui/icons/Menu';
import { useWindowWidth } from '@react-hook/window-size/throttled';
import clsx from 'clsx';
import React, { useState } from 'react';

import { RoleType, SidebarOption } from '../../model';
import sidebarStyles from './sidebar.module.scss';
import SidebarButton from './SidebarButton';

const sidebarWidth = 200;
const WINDOW_WIDTH_THRESHOLD = 780;

const sidebarOptionsDefault = [
  { name: 'Summary', endpoint: 'summary' },
  { name: 'Rota', endpoint: 'rota' },
];

const sidebarOptionsManager = [
  ...sidebarOptionsDefault,
  { name: 'Employees', endpoint: 'employees' },
];

const getSidebarOptions = (role: RoleType) => {
  switch (role) {
    case RoleType.Manager:
      return [...sidebarOptionsManager];
    default:
      return [...sidebarOptionsDefault];
  }
};

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
  role: RoleType;
}

const Sidebar = ({ role }: SidebarProps) => {
  const sidebarOptions = getSidebarOptions(role);
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
        open={open}>
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
