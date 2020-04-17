import React from 'react';
import sidebarStyles from './sidebar.module.scss';
import buttonList from '../../constants/sidebarOptions';

const Sidebar = () => {
  return (
    <div className={sidebarStyles.container}>
      {buttonList.map((button) => (
        <div key={button.name} className={sidebarStyles.menuOption}>
          {button.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
