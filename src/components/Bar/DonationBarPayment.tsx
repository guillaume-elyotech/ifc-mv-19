import { IonBackButton, IonButtons, IonHeader, IonItem, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import React from 'react';

const DonationBarPayment = () => {
  return (
      <div>
          

      <IonHeader translucent no-border no-shadow>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBackOutline} defaultHref="/tabs/donation"  text="" className="ios iosbackbtn"/>
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents"> Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonItem lines="none" className="item_block">
          <div className="item_flex deliveryicone iconfordonation">
            <img
              src="/assets/img/cerclevalide.png"
              className="cercle_valide_shippingdetail"
              alt="cercle_valide"
            ></img>
            <IonText className="deliver_text">Delivery</IonText>
          </div>

          <hr className="trait_simple"></hr>
          <div className="item_flex confirmationicone">
            <img
              src="/assets/img/cercleorange.png"
              className="cercle_orange_shippingdetail"
              alt="cercle_orange"
            ></img>
            <IonText className="confirmation_text payment_text">
              Confirmation
            </IonText>
          </div>
        </IonItem>

        <div className="divider-block"></div>
      </div>
  );
};

export default DonationBarPayment;
