import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonSelect,
  IonButton,
  IonSelectOption,
  IonInput,
  IonIcon,
  IonText,
  IonCard,
  IonCardSubtitle,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonFab, 
  IonFabButton,
} from "@ionic/react";

import { useHistory } from "react-router-dom";

import { setCurrentOrder } from "../../data/sessionActions";
import { OrderPageMethods } from "../../Firebase/FirebaseApi";
import { DonationOrder, Order, OrderItem } from "../../data/models";
import { RouteComponentProps } from "react-router";
import {auth} from "../../Firebase/Firebase";

import { connect } from "../../data/connect";

import "./Donation.scss";

import svgButton from "./teaching-square-button.svg";

interface OwnProps {}

interface StateProps {
  currentOrder?: Order;
}

  
interface DispatchProps {
    setCurrentOrder: typeof setCurrentOrder;
}


interface DonationProps extends OwnProps, StateProps, DispatchProps {}

const Donation: React.FC<DonationProps> = ({
  currentOrder, setCurrentOrder,

}) => {
  const [location, setLocation] = useState<
    | "Bujumbura"
    | "Kinshasa"
    | "Lubumbashi"
    | "Chipata"
    | "Lusaka"
    | "Durban"
    | "Johannesburg"
    | "Paris"
  >("Bujumbura");

  const [amount, setAmount] = useState<number>(0);
  const [donationtype, setDonationType] = useState<string>("Offering");
  const [branch, setBranch] = useState<string>("Johannesburg");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [amountError, setAmountError] = useState(false);
  const [donationtypeError, setDonationTypeError] = useState(false);
  const [branchError, setBranchError] = useState(false);

  const user = auth.currentUser;

  const selectOptions = {
    header: "Select a branch",
  };

  const options = {
    cssClass: "my-custom-interface",
  };

  const history = useHistory();

  const donationValidation = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!amount) {
      setAmountError(true);
    }
    if (!donationtype) {
      setDonationTypeError(true);
    }
    if (!branch) {
      setBranchError(true);
    }

    if (amount && donationtype && branch) {
        const donation: any = {
          id: 1,
          author: user?.displayName,
          amount: amount,
          currency: "USD",
          currencycode: "$",
          type: donationtype,
          project: donationtype,
          branch: branch,
          date: new Date(),
        };

        console.log("Le Donation Order est : ");
        console.log(donation);

        const mycurrentorder = await OrderPageMethods.purchaseDonation(donation);
        console.log("purchaseDonation : Le nouvel ordre est : ");
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
                  type: "Donation",
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

          console.log("purchaseDonation : ajout de l'ordre dans mycurrentorder  ",mycurrentorder.orderid);
          console.log(mycurrentorder);

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


          if (!currentOrder) {
            console.log("purchaseDonation : currentOrder not yet defined");
          } else {
            console.log(
              "purchaseDonation : currentOrder  " + currentOrder.orderid
            );
            console.log(currentOrder);
          }
        }
      }
  };

  return (
    <IonPage id="donation-page">
      <IonContent fullscreen>
        <IonCard className="teaching-title">
          <IonCardTitle className="donation-title"> Donation</IonCardTitle>
          <IonCardSubtitle className="donation-subtitle">
            Support Impact For Christ Ministries Charitable Deeds
          </IonCardSubtitle>
        </IonCard>

        <IonCard className="emptycard">
          <br />
          <br />
          <IonGrid>
              <IonRow className="card_donation">

              <IonCol className="donation-col">
                <IonCard className="donation-card">
                  <img src="/assets/img/charities1.jpeg" className="donation-img" alt="img-donation"/>
                </IonCard>
              </IonCol>

              <IonCol className="donation-col">
                <IonCard className="donation-card">
                  <img
                    src="/assets/img/charities2.jpeg"
                    className="donation-img"
                    alt="img-donation"
                  />
                </IonCard>
              </IonCol>

              <IonCol className="donation-col">
                <IonCard className="donation-card">
                  <img
                    src="/assets/img/charities3.jpeg"
                    className="donation-img"
                    alt="img-donation"
                  />
                </IonCard>
              </IonCol>
              </IonRow>

          </IonGrid>
          <br />
          <br />
          <br />
          <br />

          <form
            noValidate
            className="donation-form"
            onSubmit={donationValidation}
          >
            <IonText className="donation-question">
              How much wanna donate ?{" "}
            </IonText>

            <br />
            <br />

            <IonItem lines="inset" className="donation-amount">
              <IonIcon
                src="/assets/img/Dollar_Icon.svg"
                slot="start"
                className="dollar-img"
              />

              <IonInput
                className="input-amount"
                type="number"
                value={amount}
                placeholder="0,00"
                onIonChange={(e) => setAmount(parseInt(e.detail.value!, 10))}
              ></IonInput>
            </IonItem>
            {amountError && (
              <IonText color="danger">
                <p className="ion-padding-start">Amount is required</p>
              </IonText>
            )}

            <br />
            <br />

            <IonItem detail lines="none" className="cause-button mybox" >
              <IonLabel>Choose your cause</IonLabel>
              <IonSelect
                value={donationtype}
                interface="action-sheet"
                interfaceOptions={options}
                className="donation-select"
                onIonChange={(e) => {
                  setDonationType(e.detail.value!);
                  setDonationTypeError(false);
                }}
              >
                <IonSelectOption value="Tithe">Tithe</IonSelectOption>
                <IonSelectOption value="Offering">Offering</IonSelectOption>
                <IonSelectOption value="IFCM Charity">
                  Impact For Christ Ministries Charitable Deeds{" "}
                </IonSelectOption>
                <IonSelectOption value="Alexandra">
                  Alexandra Flash Floods and IFCM Charity{" "}
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            {donationtypeError && (
              <IonText color="danger">
                <p className="ion-padding-start">Fill the donation type</p>
              </IonText>
            )}

            <br />
            <br />
            <IonItem detail lines="none" className="cause-button mybox">
              <IonLabel>Location</IonLabel>

              <IonSelect
                value={branch}
                interface="action-sheet"
                className="donation-select"
                interfaceOptions={selectOptions}
                onIonChange={(e) => {
                  setBranch(e.detail.value!);
                  setBranchError(false);
                }}
              >
                <IonSelectOption value="Bujumbura">
                  Bujumbura, BURUNDI
                </IonSelectOption>
                <IonSelectOption value="Kinshasa">
                  Kinshasa, DRC
                </IonSelectOption>
                <IonSelectOption value="Lubumbashi">
                  Lubumbashi, DRC
                </IonSelectOption>
                <IonSelectOption value="Chipata">
                  Chipata, ZAMBIA
                </IonSelectOption>
                <IonSelectOption value="Lusaka">Lusaka, ZAMBIA</IonSelectOption>
                <IonSelectOption value="Durban">Durban, SA</IonSelectOption>
                <IonSelectOption value="Johannesburg">
                  Johannesburg, SA
                </IonSelectOption>
              </IonSelect>
            </IonItem>

            {branchError && (
              <IonText color="danger">
                <p className="ion-padding-start">Branch is required</p>
              </IonText>
            )}
            <br />
            <br />
            <br />

            <br />
            <IonButton
              className="donation-button"
              shape="round"
              type="submit"
              expand="block"
            >
              {" "}
              Donate{" "}
            </IonButton>
          </form>
        </IonCard>
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

//export default React.memo(Donation);

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    currentOrder: state.data?.currentOrder,
  }),
  mapDispatchToProps: {
    setCurrentOrder,
  },
  component: React.memo(Donation),
});
