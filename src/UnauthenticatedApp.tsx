import React from 'react'

import { Redirect, Route } from 'react-router-dom';

import { IonRouterOutlet } from '@ionic/react';

import Signup from './pages/Signup/Signup';
import ForgottenPwd from './pages/ForgotPwd/ForgottenPwd';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';


const UnauthenticatedApp: React.FC = () => {

  return (
    <IonRouterOutlet id="main">
          <Route path="/welcome" component={Welcome} exact={true}/>
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/signup" component={Signup} exact={true}/>
          <Route path="/forgot" component={ForgottenPwd} exact={true}/>
          <Route path="/" render={() => <Redirect to="/welcome" />} exact={true} />

    </IonRouterOutlet>
  )
}

export default UnauthenticatedApp;

