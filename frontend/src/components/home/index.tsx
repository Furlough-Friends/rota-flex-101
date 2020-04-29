import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Sidebar from '../sidebar';
import Employees from '../employees';
import Rota from '../rota';
import Summary from '../summary';
import homeStyles from './home.module.scss';

const Home = () => (
  <Router>
    <div className={homeStyles.home}>
      <Route path="/employees" component={Employees} />
      <Route path="/rota" component={Rota} />
      <Route path="/summary" component={Summary} />
      <Route path="/" component={Sidebar} />
    </div>
  </Router>
);

export default Home;
