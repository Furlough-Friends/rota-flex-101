import React from 'react';
import Sidebar from '../sidebar';
import homeStyles from './home.module.scss';

const Home = () => (
  <div className={homeStyles.sidebar}>
    <Sidebar />
  </div>
);

export default Home;
