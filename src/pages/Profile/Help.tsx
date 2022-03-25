import React, { useState } from "react";
import {
  IonListHeader,
  IonContent,
  IonPage,
  IonHeader,
  IonButton,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonRow,
  IonInput,
  IonCol,
  IonBackButton,
  IonTextarea,
  IonIcon, 
  IonFab, 
  IonFabButton,
} from "@ionic/react";

import { RouteComponentProps, withRouter } from "react-router";
import { chevronBackOutline, logoWindows } from "ionicons/icons";
import svgButton from "./teaching-square-button.svg";
import { getElementError } from "@testing-library/react";


type SomeComponentProps = RouteComponentProps;
const Help: React.FC<SomeComponentProps> = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sujet, setSujet] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [sujetError, setSujetError] = useState(false);

  const helpMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!sujet) {
      setSujetError(true);
    }
    if (!message) {
      setMessageError(true);
    }
    if (email && username) {
      history.push("/tabs/home", { direction: "none" });
    }

    window.location.href = "mailto:yovish.moonesamy@elyotech.fr?subject=" + sujet + "&body=Name : " + username + "%0D%0A" + "@mail : " + email + "%0D%0A%0D%0A" + "Message : " + message + "%0D%0A" + "%0D%0A";
  };

  

  return (
    <IonPage id="help-page">
      <IonHeader  translucent no-border>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton
                icon={chevronBackOutline}
                defaultHref="/tabs/userprofile/"
                text="" className="ios iosbackbtn"
                color="black"
              />
            </IonButtons>
            <IonTitle className="eventdetailstitle ios iostextevents">Need Help ? </IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        {/*-- Back button with a default href --*/}
        

        <br />
        <IonList className="event" lines="none">
          <IonListHeader className="titre_orders">
            Send your message{" "}
          </IonListHeader>
          <br />
          <br />

          <form noValidate onSubmit={helpMessage}>
            <IonList>
              <IonItem>
                <IonLabel position="stacked" color="primary">
                  Name
                </IonLabel>
                <IonInput
                  name="username"
                  type="text"
                  value={username}
                  spellCheck={false}
                  autocapitalize="off"
                  onIonChange={(e) => setUsername(e.detail.value!)}
                  required
                ></IonInput>
              </IonItem>
              {formSubmitted && usernameError && (
                <IonText color="danger">
                  <p className="ion-padding-start">Username is required</p>
                </IonText>
              )}

              <IonItem>
                <IonLabel position="stacked" color="primary">
                  Email
                </IonLabel>
                <IonInput
                  name="email"
                  type="email"
                  value={email}
                  spellCheck={false}
                  autocapitalize="off"
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  required
                ></IonInput>
              </IonItem>

              {formSubmitted && usernameError && (
                <IonText color="danger">
                  <p className="ion-padding-start">Email is required</p>
                </IonText>
              )}

              <IonItem>
                <IonLabel position="stacked" color="primary">
                  Sujet
                </IonLabel>
                <IonInput
                  name="sujet"
                  type="text"
                  value={sujet}
                  spellCheck={false}
                  autocapitalize="off"
                  onIonChange={(e) => setSujet(e.detail.value!)}
                  required
                ></IonInput>
              </IonItem>

              {formSubmitted && usernameError && (
                <IonText color="danger">
                  <p className="ion-padding-start">Sujet is required</p>
                </IonText>
              )}
              <IonItem>
                <IonLabel position="stacked" color="primary">
                  Votre Message
                </IonLabel>
                <IonTextarea
                  name="textarea"
                  value={message}
                  onIonChange={(e) => setMessage(e.detail.value!)}
                ></IonTextarea>
              </IonItem>

              {formSubmitted && passwordError && (
                <IonText color="danger">
                  <p className="ion-padding-start">Message is required</p>
                </IonText>
              )}
            </IonList>

            <IonRow>
              <IonCol>
                <IonButton
                  className="login-button"
                  type="submit"
                  expand="block"
                >
                  Envoyer
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
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
export default withRouter(Help);