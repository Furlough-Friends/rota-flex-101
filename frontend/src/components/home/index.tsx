import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from '../header';
import Employees from '../employees';
import Rota from '../rota';
import Sidebar from '../sidebar';
import Summary from '../summary';
import homeStyles from './home.module.scss';
import PageNotFound from '../pageNotFound';

const Home = () => (
  <div className={homeStyles.home}>
    <Sidebar />
    <div className={`${homeStyles.right} ${homeStyles.column}`}>
      <Header />
      <main className={homeStyles.main}>
        <Switch>
          <Route path="/employees" component={Employees} />
          <Route path="/rota" component={Rota} />
          <Route path="/summary" component={Summary} />
          <Route exact path="/">
            <Redirect to="/employees" />
          </Route>
          <Route path="/callback" />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    </div>
  </div>
);

export default Home;
