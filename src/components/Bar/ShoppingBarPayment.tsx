import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';

import React from 'react';
import "./ShoppingBarPayment.scss";
const ShoppingBarPayment = () => {
    return (
                <div>
                     <IonHeader className="navbar-noborder">
                <IonToolbar>
                    <IonButtons slot="start">
                    <IonBackButton
                       icon={chevronBackOutline}
                         defaultHref="/tabs/shopping"
                     />
                    </IonButtons>
                    <IonTitle className="eventdetailstitle"> Checkout</IonTitle>
                </IonToolbar>
            </IonHeader>
        <IonItem lines="none" className="item_block">
          <div className="item_flex deliveryicone">
          <IonImg src="/assets/img/cerclevalide.png" className="cercle_valide_shippingdetail" alt="cercle_valide"></IonImg>
            <IonText className="text_confirmation">Delivery</IonText>
          </div>

            <hr className="trait_simple"></hr>

            <div className="item_flex">
          <IonImg src="/assets/img/cerclevalide.png" className="cercle_valide_shippingdetail" alt="cercle_valide"></IonImg>
            <IonText className="text_confirmation">Payment</IonText>
          </div>
          <hr className="trait_simple"></hr>
          <div className="item_flex">
          <IonImg src="/assets/img/cercleorange.png" className="cercle_orange_2" alt="cercle_valide"></IonImg>
            <IonText className="delivery_text">Confirmation</IonText>
          </div>
          </IonItem>

        <div className="divider-block"></div>

                </div>
                
    );
};

export default ShoppingBarPayment;
