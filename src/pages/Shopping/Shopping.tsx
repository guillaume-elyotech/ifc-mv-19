import React, { useState, useRef } from "react";
import {
  IonBadge,
  IonRow,
  IonCol,
  IonGrid,
  IonCardTitle,
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonFab, 
  IonFabButton,
  IonPage,
  IonIcon,
  IonText,
  IonCard,
  IonLabel,
} from "@ionic/react";
import { bagOutline } from "ionicons/icons";
import "./Shopping.scss";

import { useCart } from "react-use-cart";

import { Shopping, ShoppingItem } from "../../data/models";
import { connect } from "../../data/connect";

import svgButton from "./teaching-square-button.svg";

interface OwnProps {}

interface StateProps {
  shopping?: Shopping[];
}

interface DispatchProps {}

interface ShopProps extends OwnProps, StateProps, DispatchProps {}

const Shop: React.FC<ShopProps> = ({ shopping }) => {
const { totalUniqueItems, totalItems } = useCart();

  console.log("Shopping Array");
  console.log(shopping);


  const [searchText, setSearchText] = useState("");

  // a ref variable to handle the current slider
  const slider = useRef<HTMLIonSlidesElement>(null);
  // a state value to bind segment value
  const [segment, setValue] = useState("Books");

  // a function to handle the segment changes
  const handleSegmentChange = (e: any) => {
    setValue(e.detail.value);
    // slider.current!.slideTo(e.detail.value);
    console.log(segment);
  };

  const goToShoppingCart = () => {
    document.location.href = "/tabs/shopping/shoppingcart";
  };

  return (
    <IonPage id="shopping-page">
      <IonContent className="content">
        <IonCard className="teaching-title">
          <IonCardTitle className="titre">Shop</IonCardTitle>
          <IonIcon
            icon={bagOutline}
            size="large"
            color="medium"
            className="bag-icon"
            onClick={() => goToShoppingCart()}
          />
          <IonBadge className="cart_badge">{totalItems}</IonBadge>
        </IonCard>

        <IonSegment
          className="segment"
          value={segment}
          onIonChange={(e) => handleSegmentChange(e)}
        >
          {shopping?.map((shopcategory, k) => (
            <IonSegmentButton
              defaultChecked
              className="segment_button"
              value={shopcategory.category}
              key={k}
            >
              <IonLabel>{shopcategory.category} </IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>

        <br />
        <br />
        <br />

        <IonCard className="home-emptycard">
          <IonGrid className="shopping-grid">
            <IonRow>
              <IonText className="text">{`All ${segment}`}</IonText>
            </IonRow>

            <IonRow className="card_item_shopping">
              {shopping
                ?.filter((a) => a.category === segment)
                .map((shopcat, i) => (
                  shopcat.items.map(( items, j) => (
                  <IonCol size="6" className="col_card_shopping" key={items.id}>
                    <IonRow>
                      <IonCard
                        className="shoppingitem-card"
                        routerLink={`/tabs/shopping/shoppingitemdetails/${shopcat.id}/${items.id}`}
                        key={j}                     >
                        <IonRow>
                          <IonCol size="1">
                            <br />
                          </IonCol>
                          <IonCol >
                            <img src={items.imgsrc} className="book-img" alt="shopping-img" key={i}/>
                          </IonCol>
                          <IonCol size="1">
                            <br />
                          </IonCol>
                        </IonRow>
                      </IonCard>
                    </IonRow>
                    <IonRow>
                      <IonText className="shoppingitem-text">
                     
                        {items.title}
                      </IonText>
                    </IonRow>
                    <IonRow>
                      <IonText className="shoppingitem-price">
                        {items.currencycode} {items.price}
                      </IonText>
                    </IonRow>
                  </IonCol>
                ))))}
            </IonRow>
          </IonGrid>
        </IonCard>   

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
//export default withRouter (Shopping);
export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    shopping: state.data?.shopping,
  }),
  mapDispatchToProps: {},
  component: React.memo(Shop),
});
