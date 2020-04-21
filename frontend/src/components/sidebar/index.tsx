import React from 'react';
import { Link } from 'react-router-dom';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';

const getButtons = (options: SidebarOption[], selctedOption: string) =>
  options.map(({ name, endpoint }) => (
    <Link to={`/${endpoint}`}>
    <button
      type="button"
      className={`${sidebarStyles.menuOption} ${
        name === selctedOption ? sidebarStyles.menuOption : ''
      }`}
      key={name}>
      {name}
    </button>
    </Link>
  ));

const Sidebar = ({ selctedOption }: { selctedOption: string }) => (
  <div className={sidebarStyles.container}>
    {getButtons(sidebarOptions, selctedOption)}
  </div>
);

export default Sidebar;
