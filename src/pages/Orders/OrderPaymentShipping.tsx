import React, { useState, useEffect } from "react";
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

import Stripe from '../../components/Stripe/Stripe';

import {  db } from "../../Firebase/Firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";

import { OrderPageMethods, updateMyOrder } from "../../Firebase/FirebaseApi";

import { setCurrentOrder } from "../../data/sessionActions";

import "./OrderPaymentShipping.scss";
import ShoppingCheckoutPayment from "../../components/Checkout/ShoppingCheckoutPayment";




interface OwnProps extends RouteComponentProps {
  orderId: string;
}

interface StateProps {
}
interface DispatchProps {
}

interface OrderPaymentShippingProps
  extends OwnProps,
    StateProps,
    DispatchProps {}

const OrderPaymentShipping: React.FC<OrderPaymentShippingProps> = ({
  orderId,
}) => {
  const [clientSecret, setClientSecret] = useState("");

  console.log("OrderPaymentShipping - orderId : ", orderId);

  const [data, setData] = useState([] as any);
  const [itemsData, setItemsData] = useState([] as any);
  const [name, setName] = useState([]);
  const [state, setState] = useState([]);

/*
  const [theorder, setTheOrder] = useState<any>({});
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the database
      const data = await OrderPageMethods.getOrderById(orderId);
      //const data = await OrderPageMethods.getCurrentOrder(orderId);
      console.log("fetchData to get order : ", data);
      // convert the data to Order
     // const order = data[0];
    //  console.log("The current order is : ", order);
  
      // set state with the result
      setTheOrder(data);
      console.log("the order table is  : ", theorder);
      //console.log("the order is : ", theorder[0]);
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);
*/

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


  const totalorderamount = () => {
    return theorder?.totalamount;
  };

 
  const promise = loadStripe(
    "pk_test_51JRPbGARxeHqlHCsI4CLOR4BLAaqgKKV81Bv8SugWCQtGpf61XzaicxntPZY4dDCcnsVTG6kAOXDNuNNylurVm0P00HYiwlDEk"
  );
  
  return (
    <IonPage id="payment-page">
      <IonContent fullscreen>
        
        <ShoppingCheckoutPayment/>

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
  mapStateToProps: (state, ownProps) => ({
    orderId: selectors.getIdParam(state, ownProps),
  }),
  mapDispatchToProps: {
  },
  component: React.memo(OrderPaymentShipping),
});

//export default withRouter (PaymentCardDetailTeaching);