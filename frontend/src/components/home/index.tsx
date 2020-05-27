import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import toastr from 'toastr';
import Header from '../header';
import Employees from '../employees';
import Rota from '../rota';
import Sidebar from '../sidebar';
import Summary from '../summary';
import homeStyles from './home.module.scss';
import { useAuth0 } from '../../react-auth0-spa';
import FullPageLoader from '../fullPageLoader';
import ErrorPage from '../errorPage';
import {
  getRole,
  hasViewPermissions,
  hasManagerPermissions,
} from '../../service/auth';
import { Role } from '../../constants/employees';
import { getSidebarOptions } from '../../constants/sidebarOptions';

const Home = () => {
  const { getTokenSilently } = useAuth0();
  const [role, setRole] = useState<Role>(Role.NONE);
  const [roleChecked, setRoleChecked] = useState(false);
  useEffect(() => {
    getTokenSilently()
      .then((token) => getRole(token))
      .then((fetchedRole) => {
        setRole(fetchedRole);
        setRoleChecked(true);
      })
      .catch((err) => {
        toastr.error(err);
        toastr.error('User not found');
        setRoleChecked(true);
      });
  }, [getTokenSilently]);

  if (hasViewPermissions(role) && roleChecked) {
    return (
      <div className={homeStyles.home}>
        <Sidebar sidebarOptions={getSidebarOptions(role)} />
        <div className={`${homeStyles.right} ${homeStyles.column}`}>
          <Header />
          <main className={homeStyles.main}>
            <Switch>
              {hasManagerPermissions(role) && (
                <Route path="/employees" component={Employees} />
              )}
              <Route path="/rota" component={Rota} />
              <Route path="/summary" component={Summary} />
              <Route exact path="/">
                <Redirect to="/summary" />
              </Route>
              <Route path="/callback" />
              <Route>
                <Redirect to="/summary" />
              </Route>
            </Switch>
          </main>
        </div>
      </div>
    );
  }
  return roleChecked ? (
    <ErrorPage
      error="Not registered"
      message="You need to be registered to use this application!"
      extra="Please speak to your manager."
    />
  ) : (
    <FullPageLoader />
  );
};

export default Home;
