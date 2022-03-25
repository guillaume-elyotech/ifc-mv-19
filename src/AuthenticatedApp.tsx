import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect } from 'react';

import Homepage from './pages/Homepage/Homepage';
import Shopping from './pages/Shopping/Shopping';
import Teachings from './pages/Teachings/Teachings';
import Donation from './pages/Donation/Donation';
import Profile from './pages/Profile/Profile';
import EventsDetails from './pages/Events/EventsDetails';
import { connect } from './data/connect';
import Navbar from './components/Navbar/Navbar';
import { loadAppData } from './data/sessionActions';
import { setIsLoggedIn, setUsername, loadUserData } from './data/userActions';
import RedirectToLogin from './components/RedirectToLogin';
import OrderShippingDetails from './pages/Orders/OrderShippingDetails';
import OrderPaymentShipping from './pages/Orders/OrderPaymentShipping';
import PaymentTeachingConfirmation from './pages/Orders/PaymentTeachingConfirmation';
import PaymentDonationConfirmation from './pages/Orders/PaymentDonationConfirmation';
import OrderPaymentTeaching from './pages/Orders/OrderPaymentTeaching';
import { useAuthentication } from './components/Authentication/AuthProvider';

import Signup from './pages/Signup/Signup';
import ForgottenPwd from './pages/ForgotPwd/ForgottenPwd';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';

interface StateProps { };

interface DispatchProps {
  loadAppData: typeof loadAppData;
  loadUserData: typeof loadUserData;

};

interface IfcmAppProps extends StateProps, DispatchProps { };


const AuthenticatedApp: React.FC<IfcmAppProps> = ({  loadAppData, loadUserData }) => {
  const { user } = useAuthentication();
  console.log("The user connected is :", user);

  useEffect(() => {
    console.log("Data loading");
    loadAppData();
    loadUserData();
    // eslint-disable-next-line
  }, []);


  return (


        <IonRouterOutlet id="main">
  
          <Route path="/tabs" render={() => <Navbar />} />
          <Route path="/ordershippingdetails/:id" component={OrderShippingDetails} exact={true}/>
          <Route path="/orderpaymentshipping/:id" component={OrderPaymentShipping} exact={true}/>        
          <Route path="/paymentteachingconfirmation/:id" component={PaymentTeachingConfirmation} exact={true}/>
          <Route path="/paymentdonationconfirmation/:id" component={PaymentDonationConfirmation} exact={true}/>
          <Route path="/orderpayment/:id" component={OrderPaymentTeaching} exact={true}/>

          <Route path="/welcome" component={Welcome} exact={true}/>
          <Route path="/login" component={Login} exact={true}/>
          <Route path="/" render={() => <Redirect to="/welcome" />} exact={true} />
  
        </IonRouterOutlet>
  
  
  );
  
  }
  
  
  export default connect<{}, {}, DispatchProps>({
    mapStateToProps:(state) => ({ }),
    mapDispatchToProps: { loadAppData, loadUserData },
    component: AuthenticatedApp
  });