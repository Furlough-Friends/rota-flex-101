import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  <button
    type="button"
    className={`${sidebarStyles.menuOption} ${
      `/${endpoint}` === useLocation().pathname
        ? sidebarStyles.selectedMenuOption
        : ''
    }`}
    key={name}>
    {name}
  </button>
);

const getButtons = (options: SidebarOption[]) =>
  options.map(({ name, endpoint }) => (
    <Link to={`/${endpoint}`} key={name}>
      <SidebarButton name={name} endpoint={endpoint} />
    </Link>
  ));

const Sidebar = () => (
  <div className={sidebarStyles.container}>
    {getButtons(sidebarOptions)}
    <LoginOutButton />
  </div>
);

export default Sidebar;
