import React from 'react';
import sidebarStyles from './sidebar.module.scss';

const Sidebar = () => {
  const buttonList = [
    { name: 'Summary' },
    { name: 'Rota' },
    { name: 'Employees' },
  ];
  return (
    <div className={sidebarStyles.main}>
      {buttonList.map((button) => (
        <div key={button.name} className={sidebarStyles.menuOption}>
          {button.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
