import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import toastr from 'toastr';
import Header from '../header';
import Employees from '../employees';
import Rota from '../rota';
import Sidebar from '../sidebar';
import Summary from '../summary';
import homeStyles from './home.module.scss';
import PageNotFound from '../pageNotFound';
import { get } from '../../service/apiService';
import { useAuth0 } from '../../react-auth0-spa';
import NotRegistered from '../notRegistered';
import FullPageLoader from '../fullPageLoader';

const Home = () => {
  const { getTokenSilently } = useAuth0();
  const [role, setRole] = useState<null | string>(null);
  useEffect(() => {
    const getRole = async () => {
      try {
        const token = await getTokenSilently();
        const response = await get('http://localhost:8080/role', token);
        const json = await response.json();
        setRole(json);
      } catch (err) {
        toastr.error('User not found');
        setRole('NONE');
      }
    };
    getRole();
  }, [getTokenSilently]);

  if (role === 'MANAGER' || role === 'USER') {
    return (
      <div className={homeStyles.home}>
        <Sidebar />
        <div className={`${homeStyles.right} ${homeStyles.column}`}>
          <Header />
          <main className={homeStyles.main}>
            <Switch>
              {role === 'MANAGER' && (
                <Route path="/employees" component={Employees} />
              )}
              <Route path="/rota" component={Rota} />
              <Route path="/summary" component={Summary} />
              <Route exact path="/">
                <Redirect to="/summary" />
              </Route>
              <Route path="/callback" />
              <Route component={PageNotFound} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
  if (role === 'NONE') {
    return <NotRegistered />;
  }
  return <FullPageLoader />;
};

export default Home;
