import React from 'react';
import { NavLink } from 'react-router-dom';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';
import LoginOutButton from '../loginOutButton';

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
  <div className={sidebarStyles.container}>
    {getButtons(sidebarOptions)}
    <LoginOutButton />
    {/* Button to get authenticated users' access token <TokenButton /> */}
  </div>
);

export default Sidebar;
