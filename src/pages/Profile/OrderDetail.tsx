import React from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonImg,
  IonTitle,
  IonText,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
} from "@ionic/react";
import { chevronBackOutline, downloadOutline } from "ionicons/icons";
import "./OrderDetail.scss";
import { RouteComponentProps, withRouter } from "react-router";
import { Order } from "../../data/models";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";



interface OwnProps extends RouteComponentProps {
myorder? : Order;
}

interface StateProps {
}

interface DispatchProps {}

interface ShopProps extends OwnProps, StateProps, DispatchProps {}

const OrderDetail: React.FC<ShopProps> = ({ myorder }) => {

  if (!myorder) {
    <div>No order to display</div>
  }


  const cardHide = (card: string) => {
    let hideNum = [];
    for (let i = 0; i < card.length; i++) {
      if (i < card.length - 4) {
        hideNum.push("*");
      } else {
        hideNum.push(card[i]);
      }
    }
    return hideNum.join("");
  };

  var creationdate = new Date();
  console.log("creation date of order : ");
  console.log(creationdate);

  return (
    <IonPage id="ordertail-page">
      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref="/tabs/userprofile/orderlist"
            />
          </IonButtons>
          <IonTitle className="eventdetailstitle"> Order detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <div>
          <h2 className="ordernum">{`Order ID:#${myorder?.orderid}`}</h2>
          <h1 className="orderdate">
            {" "}
            {`Place on the ${creationdate.toDateString()}`}{" "}
          </h1>
          <IonItem className="order-receipt" lines="none">
            <IonIcon
              slot="start"
              color="primary"
              icon={downloadOutline}
            ></IonIcon>
            <IonLabel color="primary">Get Receipt</IonLabel>
          </IonItem>
          <br />
        </div>

        <IonCard no-border className="order-card">
          <IonCardContent>
            <IonGrid>
              <IonItem className="borderline" lines="inset" />
              {myorder?.orderitems.map((items, i) => (
                <IonRow>
                  <IonCol className="item-title" size="9">
                    {items.title}
                  </IonCol>

                  <IonCol size="3">
                    &nbsp;&nbsp;
                    <b>
                      {items.currencycode} {items.amount}
                    </b>
                  </IonCol>
                  <br />
                  <br />
                </IonRow>
              ))}

              <IonRow>
                <IonCol size="9">
                  <b color="black">Paid</b>
                </IonCol>

                <IonCol size="3">
                  <IonText color="primary">
                    &nbsp;&nbsp;
                    <b>
                      {myorder?.currencycode} {myorder?.totalamount}
                    </b>
                  </IonText>
                </IonCol>
              </IonRow>
            </IonGrid>

            <br />
            <br />
            <br />

            <div>
              <h2 className="black">PAYMENT METHOD</h2>
              <br />

              <IonItem className="card-item" lines="none">
                {myorder?.paymentmethod === "Visa" && (
                  <IonImg
                    key={"Visa"}
                    className="order-creditcard"
                    src="/assets/img/LogoVisaOn.png"
                  >
                    {" "}
                  </IonImg>
                )}
                {myorder?.paymentmethod === "Mastercard" && (
                  <IonImg
                  key={"Mastercard"}
                  className="order-creditcard"
                    src="/assets/img/LogoMastercardOn.png"
                  >
                    {" "}
                  </IonImg>
                )}
                {myorder?.paymentmethod === "Amex" && (
                  <IonImg
                  key={"Amex"}
                    className="order-creditcard"
                    src="/assets/img/LogoAmexcardOn.png"
                  >
                    {" "}
                  </IonImg>
                )}
                {myorder?.paymentmethod === "Paypal" && (
                  <IonImg
                  key={"Paypal"}
                    className="order-creditcard"
                    src="/assets/img/LogoPaypalOn.png"
                  >
                    {" "}
                  </IonImg>
                )}

                <IonLabel slot="end"> </IonLabel>
              </IonItem>
            </div>

            <br />
            <br />

            <div>
              <h2 className="black">SHIPPING ADDRESS</h2>
              <br />

              <IonItem className="order-shipping" lines="none">
                <p className="shippingadress"> {myorder?.shippingaddress}</p>
              </IonItem>
            </div>
            <br />
            <br />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default connect({
  mapStateToProps: (state, ownProps) => ({
    myorder: selectors.getOrder(state, ownProps),
  }),
  component: React.memo(OrderDetail),
});
