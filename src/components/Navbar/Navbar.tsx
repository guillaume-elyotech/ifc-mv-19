import React from "react";
import {
  IonRouterOutlet,
  IonTabs,
  IonIcon,
  IonLabel,
  IonTabButton,
  IonTabBar,
  IonFab,
  IonFabButton,
  IonFabList,
  IonImg,
  IonContent,
} from "@ionic/react";
import {
  homeOutline,
  bagOutline,
  bookOutline,
  personOutline,
  heartOutline,
} from "ionicons/icons";

import { Route, Redirect } from "react-router";
import { withRouter } from "react-router";
import "./Navbar.scss";


import Homepage from "../../pages/Homepage/Homepage";
import EventsDetails from '../../pages/Events/EventsDetails';
import TeachingPage from "../../pages/Teachings/Teachings";
import Login from "../../pages/Login/Login";
import Shop from "../../pages/Shopping/Shopping";
import UserProfile from "../../pages/Profile/Profile";
import Donation from "../../pages/Donation/Donation";
import Shoppingitemdetails from "../../pages/Shopping/Shoppingitemdetails";
import ShoppingCart from "../../pages/Shopping/ShoppingCart";
import TeachingList from "../../pages/Teachings/TeachingList";
import TeachingDetails from "../../pages/Teachings/TeachingDetails";
import TeachingOrder from "../../pages/Teachings/TeachingOrder";
import OrderList from "../../pages/Profile/OrderList";
import Help from "../../pages/Profile/Help";
import AboutUs from "../../pages/Profile/AboutUs";
import Legal from "../../pages/Profile/Legal";
import OrderDetail from "../../pages/Profile/OrderDetail";
import OrderShippingDetails from "../../pages/Orders/OrderShippingDetails";

import svgCurved from "./curved-menu.svg";
import PaymentShoppingConfirmation from "../../pages/Orders/PaymentShoppingConfirmation";
import PaymentTeachingConfirmation from "../../pages/Orders/PaymentTeachingConfirmation";
import PaymentDonationConfirmation from "../../pages/Orders/PaymentDonationConfirmation";
import UserDetail from "../../pages/Profile/UserDetail";


interface NavBarProps { }

const Navbar: React.FC<NavBarProps> = () => {
  return (

    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="tabs/home" />

        {/*
              <Redirect exact path="/tabs" to="/tabs/schedule" />
        Using the render method prop cuts down the number of renders your components will have due to route changes.
        Use the component prop when your component depends on the RouterComponentProps passed in automatically.
      */}

        <Route path="/tabs/home" render={() => <Homepage />} exact={true} />
        <Route
          path="/tabs/home/eventdetails/:id"
          component={EventsDetails}
          exact={true}
        />

        <Route path="/tabs/shopping" render={() => <Shop />} exact={true} />
        <Route
          path="/tabs/shopping/shoppingitemdetails/:idcat/:id"
          component={Shoppingitemdetails}
          exact={true}
        />

        <Route
          path="/tabs/shopping/shoppingcart"
          component={ShoppingCart}
          exact={true}
        />

        <Route
          path="/tabs/teaching"
          render={() => <TeachingPage />}
          exact={true}
        />
        <Route
          path="/tabs/teaching/teachinglist/:idcat"
          component={TeachingList}
          exact={true}
        />
        <Route
          path="/tabs/teaching/teachinglist/teachingdetails/:idcat/:id"
          component={TeachingDetails}
          exact={true}
        />
        <Route
          path="/tabs/teaching/teachingorder/:idcat/:id"
          component={TeachingOrder}
          exact={true}
        />

        <Route path="/tabs/donation" render={() => <Donation />} exact={true} />

        <Route
          path="/tabs/userprofile"
          render={() => <UserProfile />}
          exact={true}
        />

        <Route
          path="/tabs/userprofile/orderlist"
          render={() => <OrderList />}
          exact={true}
        />

        <Route
          path="/tabs/userprofile/orderdetail/:id"
          component={OrderDetail}
          exact={true}
        />

        <Route
          path="/tabs/userprofile/help"
          render={() => <Help />}
          exact={true}
        />
        <Route
          path="/tabs/userprofile/aboutus"
          render={() => <AboutUs />}
          exact={true}
        />
        <Route
          path="/tabs/userprofile/legal"
          render={() => <Legal />}
          exact={true}
        />

<Route
          path="/tabs/userprofile/userdetail"
          component={UserDetail}
          exact={true}
        />

        {/****Payment Confirmation */}
        <Route path="/tabs/paymentshoppingconfirmation/:id" component={PaymentShoppingConfirmation} exact={true}/>
        <Route path="/tabs/paymentteachingconfirmation/:id" component={PaymentTeachingConfirmation} exact={true}/>
        <Route path="/tabs/paymentdonationconfirmation/:id" component={PaymentDonationConfirmation} exact={true}/>

      </IonRouterOutlet>

      <IonTabBar slot="top" className="bar">

        <IonTabButton tab="home" href="/tabs/home" className="tab home">
          <IonIcon icon={homeOutline} />
        </IonTabButton>

        <IonTabButton tab="shopping" href="/tabs/shopping" className="tab shop">
          <IonIcon icon={bagOutline} />
        </IonTabButton>

        {/* <IonTabButton tab="teaching" href="/tabs/teaching" className="teaching">
          <IonIcon icon={bookOutline} />
          <IonLabel>Teachings</IonLabel>
        </IonTabButton> */}


        <IonTabButton tab="teaching" href="/tabs/teaching" className="tab teaching">
          <IonImg className="svgCurved" src={svgCurved} />
        </IonTabButton>

        <IonTabButton tab="donation" href="/tabs/donation" className="tab don">
          <IonIcon icon={heartOutline} />
        </IonTabButton>

        <IonTabButton tab="userprofile" href="/tabs/userprofile" className="tab profile">
          <IonIcon icon={personOutline} />
        </IonTabButton>

      </IonTabBar>
    </IonTabs>
  );
};

//export default withRouter (Navbar);
export default Navbar;