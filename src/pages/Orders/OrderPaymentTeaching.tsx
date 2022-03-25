import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonImg,
  IonTitle,
  IonText,
  IonList,
  IonItem,
  IonBackButton,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";

import { Order } from "../../data/models";

import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "./OrderPaymentTeaching.scss";

import Stripe from "../../components/Stripe/Stripe";
import { db } from "../../Firebase/Firebase";

const promise = loadStripe(
  "pk_test_51JRPbGARxeHqlHCsI4CLOR4BLAaqgKKV81Bv8SugWCQtGpf61XzaicxntPZY4dDCcnsVTG6kAOXDNuNNylurVm0P00HYiwlDEk"
);

interface OwnProps extends RouteComponentProps {
  orderId: string;
}

interface StateProps {
}
interface DispatchProps {
}

interface OrderPaymentProps
  extends OwnProps,
    StateProps,
    DispatchProps {}

const OrderPayment: React.FC<OrderPaymentProps> = ({ orderId }) => {
  const [clientSecret, setClientSecret] = useState("");

  const [theorder, setTheOrder] = useState<any>({});

useEffect(() => {
    const docRef = db.collection("orders").doc(orderId);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            setTheOrder(doc.data()) 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
  });
},[]);

  return (
    <IonPage id="payment-page">
      <IonHeader className="navbar-noborder">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref="/tabs/teaching/"
              text="" className="ios iosbackbtn"
            />
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents"> Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <br />
        <IonItem lines="none" className="item_block">
          <div className="item_flex payment_style">
            <IonImg
              src="/assets/img/cercleorange.png"
              className="cercle_orange"
              alt="cercle_orange"
            ></IonImg>
            <IonText className="payment_text">Payment</IonText>
          </div>
          <hr className="trait_simple"></hr>
          <div className="item_flex confirmationstyle">
            <IonImg
              src="/assets/img/cerclegris.png"
              className="cercle_gris"
              alt="cercle_gris"
            ></IonImg>
            <IonText className="confirmation_text">Confirmation</IonText>
          </div>
        </IonItem>
        <div className="divider_block_top"></div>
        <IonText className="Payment_title">Payment method</IonText>
        <div className="selection_payment">
        <Elements stripe={promise}>
        <Stripe currentOrder={theorder} />
       </Elements>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state:any,ownProps) => ({
      //theorder: state.data.currentorder,
      orderId: selectors.getIdParam(state, ownProps)
    }),
    mapDispatchToProps: {},
    component: React.memo(OrderPayment),
  });
  

//export default withRouter (PaymentCardDetailTeaching);