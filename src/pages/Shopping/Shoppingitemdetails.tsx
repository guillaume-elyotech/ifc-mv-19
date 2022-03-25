import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonAlert,
  IonButton,
  IonButtons,
  IonTitle,
  IonText,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonBackButton,
  IonFab,
  IonFabButton, 
  IonIcon,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import "./Shoppingitemdetails.scss";

import { Icon } from "@iconify/react";

import * as selectors from "../../data/selectors";
import { ShoppingItem } from "../../data/models";
import { connect } from "../../data/connect";
import { Item, useCart } from 'react-use-cart';

import svgButton from "./teaching-square-button.svg";


interface OwnProps {
  shoppingdetails?: ShoppingItem;
}

interface StateProps {}

interface DispatchProps {}

interface ShoppingDetailsProps extends OwnProps, StateProps, DispatchProps {}

const ShoppingDetails: React.FC<ShoppingDetailsProps> = ({
  shoppingdetails,
  
}) => {

  const [present] = useIonAlert();
  const {inCart, addItem} = useCart();

  const AddToCart = (el:ShoppingItem) => {
    if (!el) {
      console.log("AddToCart : shopping details nul");
      console.log(el)
    }
    else {
        console.log("AddToCart : afficher l'item");
        console.log(el);

          if (inCart(el.id)) {
              present({
                cssClass: "my-css",
                header: "Alert",
                message: "This item is already in your shopping cart",
                buttons: [
                  "Cancel",
                  { text: "Ok", handler: (d) => console.log("ok pressed") },
                ],
                onDidDismiss: (e) => console.log("did dismiss"),
              });
            } else { 
              addItem(el,1);

              present({
                cssClass: "my-css",
                header: "Alert",
                message: "item added to your shopping cart",
                buttons: [
                  "Cancel",
                  { text: "Ok", handler: (d) => console.log("ok pressed") },
                ],
                onDidDismiss: (e) => console.log("did dismiss"),
              });
            }
          }
  };

  const BuyNow = (el:any) => {
    if (inCart(el.id)) {
      present({
        cssClass: "my-css",
        header: "Alert",
        message: "This item is already in your shopping cart",
        buttons: [
          "Cancel",
          { text: "Ok", handler: (d) => console.log("ok pressed") },
        ],
        onDidDismiss: (e) => console.log("did dismiss"),
      });
    } else {
      addItem(el, 1);
      document.location.href = "/tabs/shopping/ShoppingCart";
    }
  };


  if (!shoppingdetails){
    return <div>No shopping item selected</div>

  }

  
  return (
    <IonPage>
       <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBackOutline}  defaultHref="/tabs/Shopping"  text="" className="ios iosbackbtn"/>
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents">Shop Book</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow>
          <IonCol size="12">
            <IonCard className="item_card" key={shoppingdetails?.id}>
              <IonGrid>
                <IonRow>
                  <IonCol size="2">
                    <br />
                  </IonCol>
                  <IonCol>
                    <img
                      className="shoppingitemd-card"
                      src={shoppingdetails?.imgsrc}
                      alt={shoppingdetails?.title}
                    />
                  </IonCol>
                  <IonCol size="2">
                    <br />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            <IonRow>
              <IonCol>
                <IonText className="card_title">
                  {" "}
                  {shoppingdetails?.title}
                </IonText>
              </IonCol>
            </IonRow>

            <IonRow className="row_sub_title">
              <IonCol>
                <IonText className="card_sub_title">
                  {" "}
                  {shoppingdetails?.author}
                </IonText>
              </IonCol>
              <IonCol>
                <span className="shoppingitem-d-price">
                  {" "}
                  {shoppingdetails?.currencycode} {shoppingdetails?.price}{" "}
                </span>
              </IonCol>
            </IonRow>

          </IonCol>
        </IonRow>

        <IonRow className="icon_addshopping">

          <IonCol>
            <IonRow>
              <IonCol>
                

                  <Icon icon="bi:bag-plus" 
                onClick={() => AddToCart(shoppingdetails)}
                className="icon_cart cercle_grey"
                fontSize="15px"
                width="40px"
                />
                
              
              </IonCol>
            </IonRow>
          </IonCol>

          <IonCol>
            <IonRow>
              <IonCol className="col">
                <IonButton
                  onClick={() => BuyNow(shoppingdetails)}
                  className="shopping-item-button"
                  shape="round"
                  type="submit"
                  expand="block"
                  routerLink={`/tabs/shopping/ShoppingCart`}
                >
                  {" "}
                  Buy now
                </IonButton>
              </IonCol>
            </IonRow>
          </IonCol>
        </IonRow>

          <span className="grey_line"></span>
          <br/>
        <IonRow>
          <IonCol className="book_description">
            <p>{shoppingdetails?.description}</p>
          </IonCol>
        </IonRow>

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
export default connect({
  mapStateToProps: (state, ownProps) => ({
    shoppingdetails: selectors.getShoppingDetails(state, ownProps),
  }),
  mapDispatchToProps: {},
  component: React.memo(ShoppingDetails),
});
