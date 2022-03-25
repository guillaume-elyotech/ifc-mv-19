import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
// CheckoutPayment 
import React from 'react';
import "./ShoppingCheckoutPayment.scss";
const ShoppingCheckoutPayment = () => {
    return (
      <div>
<IonHeader className="navbar-noborder">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref="/tabs/shopping"
              text="" className="ios iosbackbtn"
            />
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents"> Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

<br/>
       <div >

       <div className="div_checkout">
         
         <div className='checkout_flex'>

         <IonImg
                   src="/assets/img/cerclevalide.png"
                   className="checkout_cercle_orange"
                   alt="cercle_valide"
                 ></IonImg>

                 <IonText className="checkout_text">Delivery</IonText>

         </div>
         
         <div className='checkout_flex'>

         <hr className="trait_checkout"></hr>

         </div>

         <div className='checkout_flex'>

         <IonImg
                   src="/assets/img/cercleorange.png"
                   className="checkout_cercle_orange"
                   alt="cercle_orange"
                 ></IonImg>

                 <IonText className="checkout_text orange">Payment</IonText>

         </div>

         <div className='checkout_flex'>

           <hr className="trait_checkout"></hr>

           </div>

           <div className='checkout_flex'>

<IonImg
         src="/assets/img/cerclegris.png"
         className="checkout_cercle_orange"
         alt="cercle_gris"
       ></IonImg>

       <IonText className="checkout_text grey">Confirmation</IonText>

</div>
         


       </div>

         </div>
         <br/>
         <div className="divider_block_top"></div>
   </div>
                
    );
};

export default ShoppingCheckoutPayment;
