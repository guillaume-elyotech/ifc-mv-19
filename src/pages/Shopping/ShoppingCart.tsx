import React, {  useState } from "react";
import {  useCart } from "react-use-cart";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButton,
  IonButtons,
  IonTitle,
  IonCard,
  IonFooter,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
  IonFabButton,
  IonFab,
  IonIcon,
  IonBadge,
} from "@ionic/react";
import { bagOutline, chevronBackOutline,removeCircleOutline,bagAddOutline } from "ionicons/icons";


import { useAuthentication, firebaseAuth } from '../../components/Authentication/AuthProvider';


import { Order, OrderItem } from "../../data/models";
import { connect } from "../../data/connect";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";
import {OrderPageMethods,} from '../../Firebase/FirebaseApi';
import {auth} from '../../Firebase/Firebase';
/*
import {
  auth,
  getLastOrderId,
  writeOrderData,
} from "../data/firebaseApi";
*/
import { setCurrentOrder } from "../../data/sessionActions";
import svgButton from "./teaching-square-button.svg";
import "./ShoppingCart.scss";


interface OwnProps { };

interface StateProps {
  theorder?: Order;
}

interface DispatchProps {
  setCurrentOrder: typeof setCurrentOrder;
}

interface ShoppingCartProps extends OwnProps, StateProps, DispatchProps {};


const ShoppingCart: React.FC<ShoppingCartProps> = ({
  theorder,
  setCurrentOrder,
}) => {

  const history = useHistory();
  //  const [user] = useAuthState(auth);
  const { user } = useAuthentication();
  const [totalAmount, setTotalAmount] = useState<number>();
  const [muCurrentOrder, setMyCurrentOrder] = useState<any>({});
  
  const {
    isEmpty,
    totalUniqueItems,
    totalItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart();



  if (isEmpty)
    return (
      <div>
        <IonHeader translucent no-border className="navbar-noborder">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBackOutline}  defaultHref="/tabs/shopping"  text="" className="ios iosbackbtn"/>
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents">Shopping Cart</IonTitle>
         
        </IonToolbar>
      </IonHeader>

       
        <IonCard>
          {" "}
          <IonRow>
            <IonCol size="12">Your cart is empty</IonCol>
          </IonRow>
        </IonCard>
      </div>
    );

  const purchaseCart = async () => {
    console.log("purchaseCart: Cart empty : " + isEmpty);

      let lastordernum =  await OrderPageMethods.getLastOrderId();
      console.log("purchaseCart: Last order Id is : " + lastordernum);

      const orderId = lastordernum + 1;
      console.log("purchaseCart: New order Id is : " + orderId);

      const orderItems: OrderItem[] = [];
      items.forEach((curitem) => {
        if (!curitem) {
        }
        else {
          var price = curitem?.price;
          var quantity = curitem?.quantity;
          var itemAmount;
          if (price && quantity)
          {
           itemAmount = price * quantity;
          }

          const orderitem: OrderItem = {
              id: parseInt(curitem.id),
              idcat: curitem.idcat,
              category: curitem.category,
              type: "Shopping",
              title: curitem.title,
              imgsrc: curitem.imgsrc,
              author: curitem.author,
              price: curitem.price,
              qty: curitem.quantity,
              amount: itemAmount as number,
              currencycode: curitem.currencycode,
              currency: curitem.currency,
        };
        
        console.log("purchaseCart : OrderItem : ", orderitem);
        orderItems.push(orderitem);
      }
      });

      console.log(
        "purchaseCart : The order items to purchase are : ",
        orderItems
      );

      const myorder: Order = {
        orderid: orderId,
        creationdate: new Date(),
        createdBy: user.uid as string,
        createdByName: user.displayName as string,
        deliverydate: new Date(),
        shippingstatus: "Not shipped",
        orderstatus: "Draft",
        totalamount: cartTotal,
        currencycode: items[0].currencycode,
        currency: items[0].currency,
        paymentmethod: "",
        paymentcard: "",
        transactionid: "",
        shippingaddress: "",
        orderitems: orderItems,
      };
      //   const mycurrentorder = await purchaseShopping(items);
      console.log("purchaseCart : Le nouvel ordre est : ");
      console.log(myorder);
      const res =  OrderPageMethods.writeOrderData(orderId, myorder);
      if (res != null){

        console.log("purchaseCart: Order write in FireStore : " + orderId);
        setMyCurrentOrder(myorder);
        if (myorder) {
            setMyCurrentOrder(myorder);
            await setCurrentOrder(myorder);

            console.log(
              "purchaseCart : ajout de l'ordre dans mycurrentorder  " +
                myorder.orderid
            );
            console.log(myorder); 

            if (!theorder) {
              console.log("purchaseCart : currentOrder not yet defined");
            }
            else {
              console.log("purchaseCart : currentOrder  " +theorder?.orderid);
              console.log(theorder);
            } 
            history.push(`/ordershippingdetails/${myorder.orderid}`);
      }
    }
  
  };

  return (
    <IonPage>

      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBackOutline}  defaultHref="/tabs/shopping"  text="" className="ios iosbackbtn"/>
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents">Shopping Cart</IonTitle>
          <div className="MyBag ios mybagios">
          <IonIcon
            icon={bagOutline}
            size="large"
            color="medium"
            className="bag-icon"
          />
          <IonBadge className="cart_badge">{totalItems}</IonBadge>
          </div>
        </IonToolbar>
      </IonHeader>

      
      <IonContent fullscreen>
        {items.map((item: any,i) => (
          <IonCard id={"" + item.id} className="item_card" key={i}>
            <IonGrid>
              <IonRow>
                <IonCol className="cart_flex">
                  <div>
                    {" "}
                    
                    <img className="shopping-cart" src={item.imgsrc} alt={item.title}/>{" "}
                  </div>
                </IonCol>
                <IonCol>
                  <IonRow>
                    {" "}
                    <IonCol className="title">{item.title}</IonCol>
                  </IonRow>
                  <br/>
                  <IonRow>
                
                    <IonCol className="subtitle">{item.author} </IonCol>
                  </IonRow>
                  <br />
                  <IonRow>
                    {" "}
                    <IonCol className="price_item">
                      {" "}
                      {`Price : ${item.currencycode} ${item.price}`}{" "}
                    </IonCol>{" "}
                  </IonRow>
                  <IonRow>
                    <IonCol size="3">
                      <IonIcon icon={removeCircleOutline} color={"#00000"}
                        className="icon_remove"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }>

                      </IonIcon>
                    
                    </IonCol>

                    <IonCol size="3" className="number-item">
                      <IonLabel className="col">{item.quantity} </IonLabel>
                    </IonCol>

                    <IonCol size="3">
                      <IonIcon icon={bagAddOutline}
                      color={"#00000"}
                        className="icon_add"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }>

                      </IonIcon>
                      
                    </IonCol>
                    <IonCol size="3">
                      <Icon
                        onClick={() => removeItem(item.id)}
                        className="icon_LockClosed"
                        color="#ff5756"
                        icon="eva:trash-outline"
                        width="25"
                      />
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        ))}
        <br/>
        <span className="grey_line_shopping"></span>

        <IonGrid className="total_div">
          <IonRow className="total">
            <IonCol>Total</IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="item-number">{`${totalItems} Items`}</IonCol>
            <IonCol className="total_price">{`R ${cartTotal}`}</IonCol>
          </IonRow>
        </IonGrid>
        <div className="footer_flex">
        <IonRow>
          <IonCol>

            <IonButton
              className="shopping-item-buttonn"
              shape="round"
              type="submit"
              expand="block"
              onClick={() => purchaseCart()}  >
              {" "}
              Pay
            </IonButton>

             
          </IonCol>
        </IonRow>
      </div>
      <br/>
      <div className="content"></div>

<IonFab vertical="bottom" horizontal="center" slot="fixed" className="svgButton">
  <IonFabButton href="/tabs/teaching" className="svgButtonBg">
    <IonIcon className="svgIcon" icon={svgButton}></IonIcon>
  </IonFabButton>
</IonFab>

      </IonContent>

     

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    theorder: state.data?.currentOrder
  }),
  mapDispatchToProps: {
    setCurrentOrder,
  },
  component: React.memo(ShoppingCart)
});