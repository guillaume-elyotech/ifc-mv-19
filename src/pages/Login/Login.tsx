
import React, { useState, useEffect, useContext,FormEvent } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonRouterLink,
  IonIcon,
  IonToast
} from "@ionic/react";

import { RouteComponentProps } from "react-router";

import { logoFacebook, logoGoogle, logoTwitter } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./Login.scss";

import { connect } from "../../data/connect";

import { loadAppData } from '../../data/sessionActions';
import { setIsLoggedIn, setUsername, loadUserData } from '../../data/userActions';

import { throws } from "assert";

import { firebaseAuth } from '../../components/Authentication/AuthProvider';


interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  loadAppData: typeof loadAppData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
};


interface LoginProps extends OwnProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, loadAppData, loadUserData 
 
}) => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<any>({});

  
  const history = useHistory();

  const { handleLogin, inputs, user, setInputs, errors } = useContext(firebaseAuth)

  useEffect(() => {

    if (user === undefined || user === null) {
      // Le User n'est pas authentifié
      console.log("The user is not authentified : ", errors);

    }
    else {
      console.log("The user logged in is : ");
      console.log(user);

      loadAppData();
      loadUserData();
      return history.push("/tabs/home");
    }

  }, [user]);



  const login = async (e: React.FormEvent) => {
    try {
          e.preventDefault();
          setFormSubmitted(true);
          if (!username) {
            setUsernameError(true);
          }
          if (!password) {
            setPasswordError(true);
          }
        if(password && username){
          setPasswordError(false)
          setUsernameError(false)
          setInputs(prev => ({...prev, 'email': username}))
          console.log("Affiche l'email saisi : ", inputs.email);
          setInputs(prev => ({...prev, 'password': password}))
          console.log("Affiche le pwd saisi : ", inputs.password);
          // gerer les erreurs + redirect 
          //const res =  await LoginWithEmailAndPassword(username,password);
          const res =  await handleLogin(inputs.email, inputs.password)
          console.log("Affiche le resultat du login : ", res)
          if (res == null ) {
            throw res;
          }
          setErrorInfo({});
          setIsLoggedIn(true);
          return history.push("/tabs/home");
         }
      }
      catch (e) {
          setErrorInfo({ showErrorToast: true, errMsg: e.message });
          return false;
      }

    }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
          e.preventDefault();
          setFormSubmitted(true);
          /*
          if (!inputs.email) {
            setUsernameError(true);
          }
          if (!inputs.password) {
            setPasswordError(true);
          }
          */
        if(inputs.email && inputs.password){
          setPasswordError(false)
          setUsernameError(false)
          // gerer les erreurs + redirect 
          
          const res =  await handleLogin(inputs.email, inputs.password)
          if (res == null ) {
            throw res;
          }
          setErrorInfo({});
          setIsLoggedIn(true);
          return history.push("/tabs/home");
         }
      }
      catch (e) {
 
          setErrorInfo({ showErrorToast: true, errMsg: {e} });
          return false;
      }

    }

    const handleChange= (e: any) => {
      const { name, value } = e.currentTarget
      setInputs(prev => ({...prev, [name]: value}))
      console.log("inputs are : ", {name, value} );

  
    }
  
  const handleChangeEmail = (e: any) => {
    const { name, value } = e.currentTarget
    setInputs(prev => ({...prev, [name]: value}))
    console.log("Value Username :", inputs.email);
    setUsername(inputs.email);

  }

  const handleChangePwd = (e: any) => {
    const { name, value } = e.currentTarget
    setInputs(prev => ({...prev, [name]: value}))

    console.log("Value Username :", inputs.password);
    setPassword(inputs.password);
  }




  return(
    <IonPage id="login-page">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start"></IonButtons>
        <IonTitle>Login to IFCM</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="login-logo">
        <img src="assets/img/ifcm_logo.png" alt="ifcm Logo" />
      </div>
    <IonButton href="/tabs/home">Skip Login Page</IonButton>
      <form noValidate onSubmit={login}>
        <IonList>
          <IonButton
            expand="block"
            color="facebook"
            className="margin"
           
          >
            <IonIcon icon={logoFacebook} color={"#ffffff"}  />{" "}
            <IonText className="facebook">Facebook Connect</IonText>
          </IonButton>

          <IonButton  className="margin-google"  
          >
          <IonIcon icon={logoGoogle} color={"#ffffff"} />{" "}
            </IonButton>

            <IonButton  className="margin-google" 
            >
          <IonIcon icon={logoTwitter} color={"#ffffff"} />{" "}
            </IonButton>

          <IonText className="ion-text-center">
            {" "}
            <p className="gray"> OR</p>
          </IonText>

          <IonItem>
            <IonLabel position="stacked" color="primary">
              Email
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
              <p className="ion-padding-start">Email is required</p>
            </IonText>
          )}

          <IonItem>
            <IonLabel position="stacked" color="primary">
              Password
            </IonLabel>
            <IonInput
              name="password"
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            ></IonInput>
          </IonItem>

          {formSubmitted && passwordError && (
            <IonText color="danger">
              <p className="ion-padding-start">Password is required</p>
            </IonText>
          )}

          { passwordError && (
            <IonText color="danger">
              <p className="ion-padding-start"> {message}</p>
            </IonText>
          )}

        </IonList>

        <IonRow>
          <IonCol>
            <IonButton className="login-button" type="submit" expand="block">
              Login
            </IonButton>
          </IonCol>
        </IonRow>
      </form>
      <IonText className="ion-text-center">
        <IonRouterLink href="/forgot" class="forgot">
          Forgot Password ?
        </IonRouterLink>
        <p>
          Don't have an account ?{" "}
          <IonRouterLink href="/signup">Sign up</IonRouterLink>
        </p>
      </IonText>

      <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
          message={errors[0]}
          duration={2000}
        />
    </IonContent>
  </IonPage>
  )
};


export default connect<OwnProps, {}, DispatchProps>({

  mapDispatchToProps: { loadAppData, loadUserData, setIsLoggedIn },

  component: Login,
});