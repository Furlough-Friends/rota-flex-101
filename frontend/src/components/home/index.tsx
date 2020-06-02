import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import toastr from 'toastr';

import { Role } from '../../constants/employees';
import { getSidebarOptions } from '../../constants/sidebarOptions';
import { useAuth0 } from '../../react-auth0-spa';
import {
  getRole,
  hasManagerPermissions,
  hasViewPermissions,
} from '../../service/auth';
import logger from '../dev/logger';
import Employees from '../employees';
import ErrorPage from '../errorPage';
import FullPageLoader from '../fullPageLoader';
import Header from '../header';
import Rota from '../rota';
import Sidebar from '../sidebar';
import Summary from '../summary';
import homeStyles from './home.module.scss';

const Home = () => {
  const { getTokenSilently } = useAuth0();
  const [role, setRole] = useState<Role>(Role.NONE);
  const [roleChecked, setRoleChecked] = useState(false);
  useEffect(() => {
    getTokenSilently()
      .then(logger('Token: '))
      .then(getRole)
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
