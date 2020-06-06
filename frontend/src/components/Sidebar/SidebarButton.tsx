import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { SidebarOption } from '../../model';
import sidebarStyles from './sidebar.module.scss';

export interface SidebarButtonProps extends SidebarOption {
  isWindowBig: boolean;
}

const sidebarWidth = 200;

const useStyles = makeStyles(() => ({
  sizeSidebar: {
    width: sidebarWidth,
  },
}));

export default ({ name, endpoint, isWindowBig }: SidebarButtonProps) => (
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
