import React from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonButtons,
  IonIcon,
  IonImg,
  IonText,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { chevronBackOutline, lockClosedOutline } from "ionicons/icons";
import "./TeachingOrder.scss";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";

import { setCurrentOrder } from "../../data/sessionActions";
import { TeachingPageMethods, OrderPageMethods } from "../../Firebase/FirebaseApi";
import { TeachingLesson, Order, OrderItem } from "../../data/models";

import { connect } from "../../data/connect";

import * as selectors from "../../data/selectors";
import { auth } from "../../Firebase/Firebase";

import svgButton from "./teaching-square-button.svg";

interface OwnProps extends RouteComponentProps {
  teachingdetails?: TeachingLesson;
}

interface StateProps {
  currentOrder?: Order;
}

interface DispatchProps {
  setCurrentOrder: typeof setCurrentOrder;
}

interface TeachingOrderProps extends OwnProps, StateProps, DispatchProps { }

const TeachingOrder: React.FC<TeachingOrderProps> = ({
  teachingdetails,
  currentOrder,
  setCurrentOrder,
}) => {
  if (!teachingdetails) {
    <div>The is no teaching to purchase</div>;
  }
  const user = auth.currentUser;
  const history = useHistory();

  const purchaseSelectedTeaching = async () => {
    if (!teachingdetails) {
      <div>The is no teaching to purchase</div>;
    } else {
      const mycurrentorder = await TeachingPageMethods.purchaseTeaching(teachingdetails);
      console.log("purchaseSelectedTeaching : Le nouvel ordre est : ");
      console.log(mycurrentorder);
      if (mycurrentorder) {
        setCurrentOrder(mycurrentorder);
        const orderItems: OrderItem[] = [];
        mycurrentorder.orderitems.forEach((curitem) => {
          if (!curitem) {
          }
          else {
            var price = curitem?.price;
            var quantity = curitem?.qty;
            var itemAmount;
            if (price && quantity)
            {
             itemAmount = price * quantity;
            }
  
            const orderitem: OrderItem = {
                id: curitem.id,
                idcat: curitem.idcat,
                category: curitem.category,
                type: "Teaching",
                title: curitem.title,
                imgsrc: curitem.imgsrc,
                author: curitem.author,
                price: curitem.price,
                qty: curitem.qty,
                amount: itemAmount as number,
                currencycode: curitem.currencycode,
                currency: curitem.currency,
          };
          
          console.log("purchaseCart : OrderItem : ", orderitem);
          orderItems.push(orderitem);
        }
        });
        console.log(
          "purchaseSelectedTeaching : ajout de l'ordre dans mycurrentorder  " +
          mycurrentorder.orderid
        );
        console.log("current teaching",mycurrentorder);

        const myorder: Order = {
          orderid: mycurrentorder.orderid,
          creationdate: new Date(),
          createdBy: user?.uid as string,
          createdByName: user?.displayName as string,
          deliverydate: new Date(),
          shippingstatus: "Not shipped",
          orderstatus: "Draft",
          totalamount: mycurrentorder.totalamount,
          currencycode: mycurrentorder.currencycode,
          currency:mycurrentorder.currency,
          paymentmethod: "",
          paymentcard: "",
          transactionid: "",
          shippingaddress: "",
          orderitems: orderItems,
        };
        const res =  OrderPageMethods.writeOrderData(mycurrentorder.orderid, myorder);

          
     history.push(`/orderpayment/${mycurrentorder.orderid}`);


        if (!mycurrentorder) {
          console.log("currentOrder not yet defined");
        } else {
          console.log(
            "purchaseSelectedTeaching : currentOrder  " + mycurrentorder.orderid
          );
          console.log(mycurrentorder);
        }
      }
    }
  };

  return (
    <IonPage id="teachingorder-page">
      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
          <IonBackButton
            icon={chevronBackOutline}
            defaultHref={`/tabs/teaching/teachinglist/${teachingdetails?.idcat}`}
            key={teachingdetails?.idcat}
            className="ios iosbackbtn"
            text=""
          />
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents">
     
          {`${teachingdetails?.category} `}
        </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      
        <IonCard className="box_card">
          <IonImg
            src={teachingdetails?.imgsrc}
            alt="romance"
            className="img_teaching"
          ></IonImg>
          <IonCardTitle className="titre_card_teaching">
            {teachingdetails?.title}
          </IonCardTitle>
          <IonCardSubtitle className="date_card_teaching">
            {teachingdetails?.date.setFullYear}
            <IonIcon
              className="icon_locker"
              icon={lockClosedOutline}
            ></IonIcon>{" "}
          </IonCardSubtitle>
          <IonCardContent className="text_locked">
            {teachingdetails?.text}
          </IonCardContent>
        </IonCard>
        <IonText className="center shop_text">
          Shop now for{" "}
          <IonText className="price"> {teachingdetails?.price}</IonText>{" "}
        </IonText>
        <IonButton
          className="payd"
          color="favorite"
          onClick={() => purchaseSelectedTeaching()}
        >
          Purchase
        </IonButton>
        <div className="content"></div>
        <IonFab vertical="bottom" horizontal="center" slot="fixed" className="svgButton">
          <IonFabButton className="svgButtonBg">
            <IonIcon className="svgIcon" icon={svgButton}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    teachingdetails: selectors.getLesson(state, ownProps),
    currentOrder: state.data?.currentOrder,
  }),
  mapDispatchToProps: {
    setCurrentOrder,
  },
  component: React.memo(TeachingOrder),
});
