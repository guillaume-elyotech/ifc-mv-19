import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonButtons,
  IonImg,
  IonTitle,
  IonText,
  IonCard,
  IonList,
  IonItem,
  IonRow,
  IonCol,
  IonBackButton,
  IonIcon,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import "./OrderShippingDetails.scss";
import { RouteComponentProps, useHistory } from "react-router";


import { Order } from "../../data/models";

import { connect } from "../../data/connect";

import * as selectors from "../../data/selectors";
import {  db } from "../../Firebase/Firebase";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { setCurrentOrder } from "../../data/sessionActions";
import { OrderPageMethods } from "../../Firebase/FirebaseApi";
import ShoppingCheckoutDelivery from "../../components/Checkout/ShoppingCheckoutDelivery";

type DeliveryItem = {
  title: string;
  text: string;
  prix: string;
  currency: string;
  currencycode: string;
};
const deliveryitems: DeliveryItem[] = [
  {
    title: "Zone 1",
    text: "South Africa",
    prix: "50",
    currency: "R",
    currencycode: "ZAR",
  },
  {
    title: "Zone 2",
    text: "West Europe",
    prix: "150",
    currency: "R",
    currencycode: "ZAR",
  },
];

interface OwnProps extends RouteComponentProps {
  orderId: string;
}

interface StateProps {

}

interface DispatchProps {
 
}

interface OrderShippingDetailsProps
  extends OwnProps,
    StateProps,
    DispatchProps {}

const OrderShippingDetails: React.FC<OrderShippingDetailsProps> = ({
  orderId,
}) => {

  const history = useHistory();
  const [name, setName] = useState([]);
  const [state, setState] = useState([]);

  console.log("OrderPaymentShipping - orderId : ", orderId);

  let [TabType, setTabType] = useState("visa");
  const [VisaActive, setVisaActive] = useState(true);
  const [MastercardActive, setMastercardActive] = useState(false);
  const [PaypalActive, setPaypalActive] = useState(false);
  const [DeliveryOption, setDeliveryOption] = useState<number>(0);

  const ChangeForPaypal = () => {
    setPaypalActive(false);
    setVisaActive(false);
    setMastercardActive(true);
    setTabType((TabType = "paypal"));
  };

/*
  const [theorder, setTheOrder] = useState<Order>({} as Order);
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

if(theorder.length > 0) { // Or if(campaign[0])
  console.log(theorder.orderid);
  console.log(theorder.createdBy);
}
  
  const totalorderamount = () => {
    return theorder?.totalamount! + DeliveryOption;
  };

  return (
    <IonPage id="payment-page">
      
      <IonContent fullscreen>

      <ShoppingCheckoutDelivery/>
     
        <IonText className="Payment_title">Delivery Option</IonText>
        <div className="selection_delivery">
          <IonList className="select_deliver">

            <IonCard
              className={PaypalActive ? "pickup" : "pickup_off"}
              color="light"
              onClick={() => ChangeForPaypal()}
            >
              <div className="flex marge">
                <IonText className="marge pickup_adress">
                  Bookshop Main 8 Smal Street, Johannesburg, GT
                </IonText>
              </div>
              <span id="cercleValider">
              
                <IonIcon src="/assets/checkmark-outline.svg" className="ValiderIcon" size="24px">
                </IonIcon>
                
              
              </span>
              <br />
              <IonText className="price margebottom margebetter">Free </IonText>
            </IonCard>

          </IonList>
        </div>
        <br/>
        <div className="divider_block_bottom2"></div>
        <br/>
        <br/>
        <IonRow className="Myorder">
          <div className="invoice">
              <div className="flexinvoice">
                      <IonText
                        slot="start"
                        className="black invoice_txt"
                      >
                        Order N°
                      </IonText>

                      <IonText
                        slot="end"
                        className="orange invoice_txt_res"
                      >
                        {theorder?.orderid}
                      </IonText>
                </div>
                <br/>
                <div className="flexinvoice">
                  <IonText
                    slot="start"
                    className="black invoice_txt"
                  >
                    Current
                  </IonText>
                  <IonText
                    slot="end"
                    className="orange invoice_txt_res"
                  >
                   R {theorder?.totalamount}{" "}
                  </IonText>
                </div>

                <br/>
                <div className="flexinvoice">
                  <IonText
                    slot="start"
                    className="black invoice_txt"
                  >
                    Delivery
                  </IonText>
                  <IonText
                    slot="end"
                    className="orange invoice_txt_res"
                  >
                    FREE
                  </IonText>
                </div>

                <br/>
                <div className="flexinvoice">
                <IonText slot="start" className="black invoice_txt">
                    Total
                  </IonText>
                  <IonText slot="end" className="orange invoice_txt_res">
                   R {theorder?.totalamount}{" "}
                  </IonText>
                </div>

          </div>
        </IonRow>
        <br/>
        <div className="div_btn_invoice">
        <IonButton
                  type="submit"
                  expand="block"
                  className="btn_invoice"
                  href={`/orderpaymentshipping/${theorder?.orderid}`}
                  
                >
                  Proceed to payment
      </IonButton>
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
  component: React.memo(OrderShippingDetails),
});