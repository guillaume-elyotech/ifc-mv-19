import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonTitle,
  IonText,
  IonCard,
  IonList,
  IonItem,
  IonRow,
  IonCol,
  IonCardTitle,
  IonBackButton,
} from "@ionic/react";
import {
  chevronBackOutline,
  lockOpenOutline,
  checkmarkOutline,
} from "ionicons/icons";
import "./PaymentTeachingConfirmation.scss";
import { RouteComponentProps } from "react-router";

import {
  doc,
  getDoc,
  
} from "firebase/firestore";

import { Order } from "../../data/models";
import { loadAppData } from "../../data/sessionActions";

import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import { db } from "../../Firebase/Firebase";
import TeachingCheckoutPayment from "../../components/Checkout/TeachingCheckoutPayment";

interface OwnProps extends RouteComponentProps {
  orderId?: string;
}

interface DispatchProps {
  loadAppData: typeof loadAppData;
}

interface StateProps {}

interface PaymentTeachingConfirmationProps extends StateProps, DispatchProps {}

const PaymentTeachingConfirmation: React.FC<PaymentTeachingConfirmationProps> = (
  { loadAppData },
  orderId
) => {
  //const [order, setOrder] = useState<Order>();
  const [order, setOrder] = useState<Order>();

  const mynumberid = window.location.pathname.split("/").slice(-1)[0];
  console.log("PaymentTeachingConfirmation - mynumberid", mynumberid);
  console.log(mynumberid);
  console.log("PaymentTeachingConfirmation : Order Id OwnProps : ", orderId);

  //Call when component is rendered
  useEffect(() => {
    getOrderFS(mynumberid);
    console.log("PaymentTeachingConfirmation: Useeffect ", order);
    loadAppData();
  }, []);

  // Fetch the required data using the get() method

  const getOrderFS = async (orderid: string) => {
    const docRef = doc(db, "orders", orderid);
    const docSnap = await getDoc(docRef);
    console.log("PaymentTeachingConfirmation - getOrderFS : docSnap", docSnap);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("PaymentTeachingConfirmation - getOrderFS : Order", data);

      if (data !== null && data !== undefined) {
      //  setOrder(data);
        console.log("PaymentTeachingConfirmation - getOrderFS : Order", {
          ...data,
        });
      }
    }
  };

  return (
    <IonPage id="paymentshipping-page">
      {/*-- Back button with a default href --*/}
      
      <IonContent fullscreen>

        <TeachingCheckoutPayment/>
        <br />
        <br />

        <IonCard className="PaymentShip_card" no-border>
          <IonCardTitle className="PaymentShip_title">
            Teaching unlocked
          </IonCardTitle>
          <br />
          <br />
          <IonIcon icon={lockOpenOutline} className="lock-button"></IonIcon>
          <IonIcon icon={checkmarkOutline} className="check-button"></IonIcon>
          <IonText className="thanks">Thanks for your purchase.</IonText>

          <IonText className="ordernumber grey">
            Order <b> {`# ${mynumberid}`}</b>
          </IonText>
          <div className="divider_blockorder"></div>

          {order?.orderitems.map((image,i) => (
            <IonList lines="none">
              <IonRow key={i}>
                <IonCol size="8">
                  <IonItem>
                    <IonText slot="start" className="orders_item">
                      {" "}
                      {image.title}
                    </IonText>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonText slot="end" className="price_article">
                      {" "}
                      {image.currencycode} {image.price}
                    </IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonList>
          ))}
          <div className="divider_blockorder_bottom"></div>
          <IonList>
            <IonRow>
              <IonCol>
                <IonItem lines="none">
                  <IonText slot="start" className="total_order">
                    Total
                  </IonText>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem lines="none">
                  <IonText slot="end" className="price_total">
                    {" "}
                    {order?.currencycode} {order?.totalamount}
                  </IonText>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonList>

          <br />
          <br />
          {order?.orderitems.map((image, i) => (
          <IonButton
            className="user-logout"
            shape="round"
            expand="block"
            href={`/tabs/teaching/teachinglist/${image.idcat}/teachingdetails/${image.id}`}
            class="btn_order"
            key={i}
          >
            Read text
          </IonButton>
        ))}
        </IonCard>
       
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    orderId: selectors.getIdParam(state, ownProps),
  }),
  mapDispatchToProps: { loadAppData },
  component: React.memo(PaymentTeachingConfirmation),
});