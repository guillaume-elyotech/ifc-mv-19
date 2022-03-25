import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonRouterLink,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonBackButton,
} from "@ionic/react";
import "./ForgottenPwd.scss";
import { chevronBackOutline } from 'ionicons/icons';

import { useHistory } from "react-router-dom";

import { connect } from "../../data/connect";

interface OwnProps {}

interface DispatchProps {}

interface ForgottenPwdProps extends OwnProps, DispatchProps {}

const ForgottenPwd: React.FC<ForgottenPwdProps> = ({}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [email, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setconfirmPasswordError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [firstNameError, setfirstNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);

  const history = useHistory();

  const resendPwd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!email) {
      setemailError(true);
    }
  }
   
  return (
    <IonPage id="pwdforgotten-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonBackButton icon={chevronBackOutline} defaultHref="/login" />
          </IonButtons>
          
          <IonTitle>Password forgotten</IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <div className="login-logo">
          <img src="assets/img/ifcm_logo.png" alt="ifcm logo" />
        </div>

        <form noValidate onSubmit={resendPwd}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Email
              </IonLabel>
              <IonInput
                name="email"
                type="email"
                value={email}
                onIonChange={(e) => {
                  setemail(e.detail.value!);
                  setemailError(false);
                }}
              ></IonInput>
            </IonItem>
            {formSubmitted && emailError && (
              <IonText color="danger">
                <p className="ion-padding-start">Email is required</p>
              </IonText>
            )}
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Send Reset Email
              </IonButton>
            </IonCol>
          </IonRow>
        </form>

        <IonText className="ion-text-center">
          
          <p>
            Don't have an account ?{" "}
            <IonRouterLink href="/signup">Sign up</IonRouterLink>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: ForgottenPwd
});
