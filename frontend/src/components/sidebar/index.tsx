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
        <div className={sidebarStyles.menuOption}>{button.name}</div>
      ))}
    </div>
  );
};

export default Sidebar;
