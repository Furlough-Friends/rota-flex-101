import React from 'react';
import { NavLink } from 'react-router-dom';
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

const Sidebar = () => (
  <nav className={sidebarStyles.container}>{getButtons(sidebarOptions)}</nav>
);

export default Sidebar;
