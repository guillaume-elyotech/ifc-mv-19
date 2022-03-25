import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
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
  IonButton,
} from "@ionic/react";
import {
  chevronBackOutline,
  lockOpenOutline,
  checkmarkOutline,
  heartOutline,
} from "ionicons/icons";
import "./PaymentDonationConfirmation.scss";
import { RouteComponentProps, useHistory } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { Order } from "../../data/models";
import { loadAppData } from "../../data/sessionActions";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import { db } from "../../Firebase/Firebase";
import DonationBarPayment from "../../components/Bar/DonationBarPayment";

interface OwnProps extends RouteComponentProps {
  orderId: string;
}

interface DispatchProps {
}

interface StateProps {}

interface PaymentDonationConfirmationProps extends OwnProps,
StateProps,
DispatchProps {}

const PaymentDonationConfirmation: React.FC<PaymentDonationConfirmationProps> = (  {orderId}
) => {
  const [order, setOrder] = useState<Order>();
  const history = useHistory();

  
  console.log("PaymentShoppingConfirmation : Order Id : ",orderId);
  
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

  console.log("The order confirmed is : ", theorder);
  return (
    <IonPage id="paymentshipping-page">
      {/*-- Back button with a default href --*/}
      
      <IonContent fullscreen>
    <DonationBarPayment/>
        <br />
        <br />

       

        <IonCard className="PaymentShip_card" no-border>
          <IonCardTitle className="PaymentShip_title">
          Successful Donation   
          </IonCardTitle>
          <br />
          <br />
          <div className="div_heart">
          <IonIcon icon={heartOutline} className="lock-button heartcheck"/>
          <IonIcon icon={checkmarkOutline} className="check-button donationcheck"/>
          </div>
        
          <IonText className="thanks">Thanks for your generosity.</IonText>

          <IonText className="ordernumber grey">Donation #{orderId}</IonText>
          <div className="divider_blockorder"></div>

          {theorder?.orderitems?.map((image:any,i:any) => (
            <IonList lines="none" key={i}>
              <IonRow>
                <IonCol size="8">
                  <IonItem>
                    <IonText slot="start" className="orders_item">
                  
                      {image.title}
                 
                    </IonText>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem>
                    <IonText slot="end" className="price_article">
                
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
                    {" "}
                  </IonText>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem lines="none">
                  <IonText slot="end" className="price_total">
                    {" "}
                  </IonText>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonList>

          <br />
          <br />
     <div className="btn_donation">
     <IonButton
            className="user-logout"
            shape="round"
            expand="block"
            href={`/tabs/home`}
            class="btn_order"
            
          >
            Back To Home
          </IonButton>
     </div>
          
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    orderId: selectors.getIdParam(state, ownProps),
  }),
  mapDispatchToProps: {  },
  component: React.memo(PaymentDonationConfirmation),
});