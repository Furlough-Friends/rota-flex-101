import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sidebarStyles from './sidebar.module.scss';
import sidebarOptions, { SidebarOption } from '../../constants/sidebarOptions';

const getButtons = (
  options: SidebarOption[],
  selected: string,
  changeSelected: (o: string) => void
) =>
  options.map(({ name, endpoint }) => (
    <Link to={`/${endpoint}`}>
      <button
        type="button"
        className={`${sidebarStyles.menuOption} ${
          name === selected ? sidebarStyles.selectedMenuOption : ''
        }`}
        key={name}
        onClick={() => changeSelected(name)}>
        {name}
      </button>
    </Link>
  ));

const Sidebar = ({ selectedOption }: { selectedOption: string }) => {
  const [selected, changeSelected] = useState(selectedOption);

  return (
    <div className={sidebarStyles.container}>
      {getButtons(sidebarOptions, selected, changeSelected)}
    </div>
  );
};

export default Sidebar;
