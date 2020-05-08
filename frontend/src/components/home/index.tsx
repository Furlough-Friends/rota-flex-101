import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../header';
import Employees from '../employees';
import Rota from '../rota';
import Sidebar from '../sidebar';
import Summary from '../summary';
import homeStyles from './home.module.scss';
import { SIDEBAR_STATES } from '../../constants/sidebarOptions';

export interface SidebarControls {
  state: string,
  handleClose: () => void,
  handleOpen: () => void,
}

const Home = () => { 
  
  const [ sidebarState, setSidebarState ] = useState(SIDEBAR_STATES.OPEN);

  const handleCloseSidebar = () => {
    setSidebarState(SIDEBAR_STATES.CLOSED);
    // (setShowSidebar(false))
  };

  const handleOpenSidebar = () => {
    setSidebarState(SIDEBAR_STATES.OPEN);
    // (setShowSidebar(true))
  };

  const sidebarControls: SidebarControls = {
    state: sidebarState,
    handleClose: handleCloseSidebar,
    handleOpen: handleOpenSidebar
  }

  return (
  <>
    <div className={homeStyles.home}>
      <Header sidebarControls={sidebarControls}/>
      <Sidebar sidebarControls={sidebarControls}/>
      <main className={homeStyles.main}>
        <Route path="/employees" component={Employees} />
        <Route path="/rota" component={Rota} />
        <Route path="/summary" component={Summary} />
        <Route exact path="/">
          <Redirect to="/employees" />
        </Route>
      </main>
    </div>
    
  </>
);}

export default Home;
