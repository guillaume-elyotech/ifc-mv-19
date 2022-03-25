import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonImg,
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
  IonLabel,
  IonButton,
} from "@ionic/react";
import {
  chevronBackOutline,
  lockOpenOutline,
  checkmarkOutline,
  bagOutline,
} from "ionicons/icons";
import "./PaymentShoppingConfirmation.scss";
import { RouteComponentProps, withRouter } from "react-router";
import { Icon } from '@iconify/react';
import { CartProvider, useCart } from 'react-use-cart';

import { IonReactRouter } from "@ionic/react-router";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


import useLocation from "react-router-dom";
import { Order } from "../../data/models";
import { loadAppData } from '../../data/sessionActions';

import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import {  db } from "../../Firebase/Firebase";
import ShoppingCheckoutConfirmation from "../../components/Checkout/ShoppingCheckoutConfirmation";

interface OwnProps extends RouteComponentProps {
  orderId: string;
}

interface DispatchProps {
};

interface StateProps {}


interface PaymentShoppingConfirmationProps
  extends OwnProps,
    StateProps,
    DispatchProps {}

const PaymentShoppingConfirmation: React.FC<PaymentShoppingConfirmationProps> = ({orderId}) => {

  const history = useHistory();

  const {
    isEmpty,
    emptyCart
  } = useCart();

  console.log("PaymentShoppingConfirmation : Order Id : ",orderId);



  
  const [theorder, setTheOrder] = useState<any>({});

  useEffect(() => {
      const docRef = db.collection("orders").doc(orderId);
  
      docRef.get().then(function(doc) {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              setTheOrder(doc.data()) 
              emptyCart();
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
        
        <ShoppingCheckoutConfirmation/>
         
     <br/>  
   
        <IonCard className="PaymentShip_card" no-border>
          <IonCardTitle className="PaymentShip_title">
            Order placed
          </IonCardTitle>
          <br />
          
          <IonIcon src="/assets/shopping-bag.svg" className="lock-button" size="24px"></IonIcon>
            
          <IonIcon icon={checkmarkOutline} className="check-button"></IonIcon>
          <br />
          <IonText className="thanks">Thanks for your purchase.</IonText>

          <IonText className="ordernumber grey">Order # <IonLabel><b>{orderId}</b></IonLabel></IonText>
          <br />
          <div className="divider_blockorder"></div>

          
          {theorder?.orderitems?.map((image:any,i:any) => (
            <IonList lines="none" key={i}>
              <IonRow>
              <div className="flexinvoice pad">
                      <IonText
                        slot="start"
                        className="text_invoice_detail"
                      >
                     {image.title}
                      </IonText>

                      <IonText
                        slot="end"
                        className="black invoice_txt_res"
                      >
                    {image.currencycode} {image.price}
                      </IonText>
                   
                </div>
                <br/>
              </IonRow>
            </IonList>
          ))}
    <br/>
    <br/>

          <div className="divider_blockorder_bottom"></div>
          <br/>
          <IonList>
            <IonRow>
            <div className="flexinvoice pad">
                      <IonText
                        slot="start"
                        className="black text_invoice"
                      >
                     Total
                      </IonText>

                      <IonText
                        slot="end"
                        className="orange invoice_txt_res ftn"
                      >
                      {theorder?.currencycode} {theorder?.totalamount}
                      </IonText>
                   
                </div>
                <br/>
            </IonRow>
          </IonList>

          <br />
          <br />
          {theorder?.orderitems?.map((image:any, i:any) => (
          <div className="centerbtn">
            <IonButton
            className="user-logout"
            shape="round"
            expand="block"
            href={`/tabs/userprofile/orderlist`}
            class="btn_order"
            key={i}
          >
            Order list
          </IonButton>
          </div>
          
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
  mapDispatchToProps: { },
  component: React.memo(PaymentShoppingConfirmation),
});
