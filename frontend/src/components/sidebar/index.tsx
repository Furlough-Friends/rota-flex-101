import React from 'react';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';

const getButtons = (options: SidebarOption[], selctedOption: string) =>
  options.map(({ name }) => (
    <button
      type="button"
      className={`${sidebarStyles.menuOption} ${
        name === selctedOption ? sidebarStyles.selectedMenuOption : ''
      }`}
      key={name}>
      {name}
    </button>
  ));

const Sidebar = ({ selctedOption }: { selctedOption: string }) => (
  <div className={sidebarStyles.container}>
    {getButtons(sidebarOptions, selctedOption)}
  </div>
);

export default Sidebar;
