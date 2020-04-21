import React from 'react';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';
import LoginOutButton from '../loginOutButton';

const getButtons = (options: SidebarOption[]) =>
  options.map((o) => (
    <button type="button" className={sidebarStyles.menuOption} key={o.name}>
      {o.name}
    </button>
  ));

const Sidebar = () => (
    <div className={sidebarStyles.container}>
      {getButtons(sidebarOptions)}
      <LoginOutButton />
    </div>
);

export default Sidebar;
