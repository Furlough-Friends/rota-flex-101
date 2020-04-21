import React from 'react';
import Sidebar from '../sidebar';
import Employees from '../employees';
import homeStyles from './home.module.scss';

const Home = () => (
  <div className={homeStyles.home}>
    <Employees />
    <Sidebar selctedOption="Summary" />
  </div>
);

export default Home;
