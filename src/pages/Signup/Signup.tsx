import React, { useState, useContext, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonRouterLink, IonToast } from '@ionic/react';
import './Signup.scss';
import { RouteComponentProps, withRouter } from 'react-router';

import { createUserAccount} from "../../Firebase/FirebaseAuth";
import {auth} from "../../Firebase/Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


import { setIsLoggedIn, setUsername } from '../../data/sessionActions';
import { useHistory } from "react-router-dom";

import { connect } from '../../data/connect';

import { firebaseAuth } from '../../components/Authentication/AuthProvider';



interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface SignupProps extends OwnProps,  DispatchProps { }

const Signup: React.FC<SignupProps> = ({setIsLoggedIn,  setUsername: setUsernameAction}) => {
  
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [email, setemail] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setconfirmPasswordError]= useState(false);
    const [emailError, setemailError] = useState(false);
    const [firstNameError, setfirstNameError] = useState(false);
    const [lastNameError, setlastNameError] = useState(false);
    const [errorInfo, setErrorInfo] = useState<any>({});

    const history = useHistory()

    const { handleSignup, inputs, setInputs, errors } = useContext(firebaseAuth);
  
//    const loginCreate = async (e: React.FormEvent) => {

    const handleChange = (e: any) => {
      const { name, value } = e.currentTarget
      setInputs(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent) => {
      try{
      e.preventDefault();
      setFormSubmitted(true);
      if(!password) {
        setPasswordError(true);
      }
      if(!confirmPassword) {
        setconfirmPasswordError(true);
      }
      if(!email) {
        setemailError(true);
      }
      if(!firstName) {
        setfirstNameError(true);
      }
      if(!lastName) {
        setlastNameError(true);
      }
  
      if(password && confirmPassword && email && firstName && lastName) {

        await handleSignup(inputs.firstName, inputs.lastName, inputs.email, inputs.password)

        history.push('/tabs/home')

      }
    }
    catch (error) {
      setErrorInfo({ showErrorToast: true, errMsg: error.message });
      return false;
    }
}
  
    return (
        <IonPage id="signup-page">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
            </IonButtons>
            <IonTitle>Create your account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="login-logo">
            <img src="assets/img/ifcm_logo.png" alt="ifcm logo" />
          </div>
  
          <form noValidate onSubmit={handleSubmit}>
            <IonList>     
              <IonItem>
                <IonLabel position="stacked" color="primary">First name</IonLabel>
                <IonInput name="firstName" type="text" value={firstName} spellCheck={false} autocapitalize="off" onIonChange={e => {
                  setfirstName(e.detail.value!);
                  setfirstNameError(false);
                }}
                  required>
                </IonInput>
              </IonItem>
              {formSubmitted && firstNameError && <IonText color="danger">
                <p className="ion-padding-start">
                First Name is required
                </p>
              </IonText>}
              <IonItem>
                <IonLabel position="stacked" color="primary">Last Name</IonLabel>
                <IonInput name="lastName" type="text" value={lastName} onIonChange={e => {
                  setlastName(e.detail.value!);
                  setlastNameError(false);
                }}>
                </IonInput>
              </IonItem>
              {formSubmitted && lastNameError && <IonText color="danger">
                <p className="ion-padding-start">
                  Last Name is required
                </p>
              </IonText>}
              <IonItem>
                <IonLabel position="stacked" color="primary">Email</IonLabel>
                <IonInput name="email" type="email" value={email} onIonChange={e => {
                  setemail(e.detail.value!);
                  setemailError(false);
                }}>
                </IonInput>
              </IonItem>
              {formSubmitted && emailError && <IonText color="danger">
                <p className="ion-padding-start">
                  Email is required
                </p>
              </IonText>}
              <IonItem>
                <IonLabel position="stacked" color="primary">Password</IonLabel>
                <IonInput name="password" type="password" value={password} onIonChange={e => {
                  setPassword(e.detail.value!);
                  setPasswordError(false);
                }}>
                </IonInput>
              </IonItem>
              {formSubmitted && passwordError && <IonText color="danger">
                <p className="ion-padding-start">
                  Password is required
                </p>
              </IonText>}
              <IonItem>
                <IonLabel position="stacked" color="primary">Confirm Password</IonLabel>
                <IonInput name="confirmPassword" type="password" value={confirmPassword} onIonChange={e => {
                  setconfirmPassword(e.detail.value!);
                  setconfirmPasswordError(false);
                }}>
                </IonInput>
              </IonItem>
              {formSubmitted && confirmPasswordError && <IonText color="danger">
                <p className="ion-padding-start">
                  Confirm Password is required
                </p>
              </IonText>}
            </IonList>
            <IonRow>
              <IonCol>
                <IonButton type="submit" expand="block">Create</IonButton>
              </IonCol>
            </IonRow>
          </form>
  

          <IonText className="ion-text-center">
        <IonRouterLink href="/forgot" class="forgot">
          Forgot Password ?
        </IonRouterLink>
        <p>
          Back to {" "}
          <IonRouterLink href="/login">Sign in </IonRouterLink>
        </p>
      </IonText>

      <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
          message={errorInfo.errMsg}
          duration={2000}
        />


        </IonContent>
  
      </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Signup
})
  
