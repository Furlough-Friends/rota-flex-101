import React from 'react';

const Sidebar = () => {
  const buttonList = [
    { name: 'Summary' },
    { name: 'Rota' },
    { name: 'Employees' },
  ];
  return (
    <div>
      {buttonList.map((button) => (
        <div>{button.name}</div>
      ))}
    </div>
  );
};

export default Sidebar;
