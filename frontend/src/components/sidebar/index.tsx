import React from 'react';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';

const getButtons = (options: SidebarOption[], selctedOption: String) =>
  options.map((o) => (
    <button
      type="button"
      className={`${sidebarStyles.menuOption} ${
        o.name === selctedOption ? sidebarStyles.selectedMenuOption : ''
      }`}
      key={o.name}>
      {o.name}
    </button>
  ));

const Sidebar = ({ selctedOption }: { selctedOption: string }) => (
  <div className={sidebarStyles.container}>
    {getButtons(sidebarOptions, selctedOption)}
  </div>
);

export default Sidebar;
