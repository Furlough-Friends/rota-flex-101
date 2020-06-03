import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import toastr from 'toastr';

import { useAuth0 } from '../../auth0Spa';
import Employees from '../../components/Employees';
import ErrorPage from '../../components/ErrorPage';
import Header from '../../components/Header';
import Rota from '../../components/Rota';
import Sidebar from '../../components/Sidebar';
import Summary from '../../components/Summary';
import { RoleType } from '../../model';
import { getRole } from '../../services/authService';
import logService from '../../services/logService';
import { isManagerRole, isValidRole } from '../../utils/role';
import FullPageLoader from '../FullPageLoader';
import homeStyles from './home.module.scss';

const Home = () => {
  const { getTokenSilently } = useAuth0();
  const [role, setRole] = useState<RoleType>(RoleType.None);
  const [roleChecked, setRoleChecked] = useState(false);
  useEffect(() => {
    getTokenSilently()
      .then(logService('Token: '))
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

  if (isValidRole(role) && roleChecked) {
    return (
      <div className={homeStyles.home}>
        <Sidebar role={role} />
        <div className={`${homeStyles.right} ${homeStyles.column}`}>
          <Header />
          <main className={homeStyles.main}>
            <Switch>
              {isManagerRole(role) && (
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
