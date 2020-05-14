import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Sidebar from '../sidebar';
import Employees from '../employees';
import Rota from '../rota';
import Summary from '../summary';
import homeStyles from './home.module.scss';
import PageNotFound from '../pageNotFound';

const Home = () => (
  <>
    <div className={homeStyles.home}>
      <Sidebar />
      <Switch>
        <Route path="/employees" component={Employees} />
        <Route path="/rota" component={Rota} />
        <Route path="/summary" component={Summary} />
        <Route exact path="/">
          <Redirect to="/summary" />
        </Route>
        <Route path="/callback" />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </>
);

export default Home;
