import React from "react";
import {
  IonListHeader,
  IonThumbnail,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonFab,
  IonFabButton, 
  IonIcon,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import "./OrderList.scss";

import { Order } from "../../data/models";
import { connect } from "../../data/connect";

import svgButton from "./teaching-square-button.svg";

interface OwnProps {}

interface StateProps {
  myorderlist: Order[];
}

interface DispatchProps {}

interface ShopProps extends OwnProps, StateProps, DispatchProps {}

const OrderList: React.FC<ShopProps> = ({ myorderlist }) => {
  console.log("Afficher la liste des commandes");
  console.log(myorderlist);

  if (!myorderlist) {
    return <div>No Orders.</div>;
  }
  return (
    <IonPage id="teachingorder-page">
      

      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref="/tabs/userprofile"
              text="" className="ios iosbackbtn"
            />
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents"> My Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonList className="event" lines="none" color="light">
          <IonListHeader className="titre_orders">Last Orders </IonListHeader>

          <br />
          <br />
          {myorderlist.map((orders, i) => (
            <IonItem
              lines="full"
              key={orders.orderid}
              routerLink={`/tabs/userprofile/orderdetail/${orders.orderid}`}
            >
              <IonThumbnail slot="start" className="">
                <img src={orders.orderitems[0].imgsrc} className="" alt="order-img"/>
              </IonThumbnail>
              <IonLabel>
                <p className="order_date">{orders.creationdate.toDateString}</p>
                <h2 className="order_title">{orders.orderitems[0].title}</h2>
                <p>{`Commande n°# : ${orders.orderid}`}</p>
                <br />
                <p>
                  <b>Etat :</b>{" "}
                  <IonText className="order_status">
                    {orders.shippingstatus}
                  </IonText>{" "}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="center" slot="fixed" className="svgButton">
          <IonFabButton href="/tabs/teaching" className="svgButtonBg">
            <IonIcon className="svgIcon" icon={svgButton}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default connect({
  mapStateToProps: (state) => ({
    myorderlist: state.data?.myOrders,
  }),
  mapDispatchToProps: {},
  component: React.memo(OrderList),
});