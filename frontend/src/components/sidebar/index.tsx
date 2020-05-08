import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption, SIDEBAR_STATES } from '../../constants/sidebarOptions';
import { SidebarControls } from '../home';

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

const Sidebar = ({ sidebarControls }: {sidebarControls: SidebarControls}) => {
  const style: CSSProperties = (sidebarControls.state !== SIDEBAR_STATES.CLOSED) ? {} : {visibility: 'hidden'};
  return (
  <nav className={sidebarStyles.container} style={style}>{getButtons(sidebarOptions)}</nav>)
};

export default Sidebar;
