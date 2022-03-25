import React, { useEffect, useState, useContext } from "react";
import {
  IonCardTitle,
  IonContent,
  IonPage,
  IonButton,
  IonIcon,
  IonCard,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonRouterLink,
  IonFab,
  IonFabButton
} from "@ionic/react";
import {
  bagOutline,
  chevronBackOutline,
  chevronForwardOutline,
  helpCircleOutline,
  informationCircleOutline,
  shieldCheckmarkOutline,
} from "ionicons/icons";
import "./Profile.scss";
import { useHistory } from "react-router-dom";
import { connect } from "../../data/connect";
import { auth } from "../../Firebase/Firebase";
import {signOutUser} from "../../Firebase/FirebaseAuth"
import { authMethods } from "../../Firebase/Auth";

import { useAuthentication, firebaseAuth } from '../../components/Authentication/AuthProvider';

import { setIsLoggedIn, setUsername, loadUserData } from '../../data/userActions';

import svgButton from "./teaching-square-button.svg";

interface OwnProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface UserProfileProps extends OwnProps, DispatchProps {}

const UserProfile: React.FC<UserProfileProps> = ({setIsLoggedIn, setUsername
 
}) => {
  const history = useHistory();
  const [lastName, setlastName] = useState('');
  var uid: any;
  var email: any;
  var fullname: any;
  var photoUrl: any;

  const { handleSignout } = useAuthentication();
  const { user, errors } = useContext(firebaseAuth);

  const handleSignoutClick = () => {
    handleSignout();
  }
  
  useEffect(() => {
    if (user === undefined || user === null) {
      console.log("The user is logged  out : ");
      console.log(user);
      //Redirect to Home page if logged in succesfull

    history.push('/Login', {direction: 'none'});
      
    }
  }, [user]);


  return (
    <IonPage id="userprofile-page">
      <IonContent fullscreen>
        <IonCard className="teaching-title">
          <IonCardTitle className="userprofile-title">
            Your account
          </IonCardTitle>
          <IonCardSubtitle className="userprofile-subtitle">
            Profile informations and settings{" "}
          </IonCardSubtitle>
        </IonCard>

        <IonCard className="emptycard">
          <p>&nbsp;</p>
          <br />

          {/*-- Default Item --*/}

          <IonItem className="user_card" lines="none" key={uid}>
            <IonAvatar slot="start" className="usercard-img">
              <img src={photoUrl} alt="myphoto"/>
            </IonAvatar>
            <IonLabel>
              <h1 className="username">
                <b> {fullname} </b>
              </h1>
              <h3 className="email"> {email} </h3>
              <IonRouterLink
                className="text-edit"
                routerLink="/tabs/userprofile/userdetail"
              >
                {" "}
                Edit info
              </IonRouterLink>
            </IonLabel>
          </IonItem>
          <br />

        
         
          <hr className="bordertop"></hr>
          <IonItem
            lines="none"
            routerLink="/tabs/userprofile/orderlist"
            className="flexprofile"
            detailIcon="false"
         
          >
            <IonIcon icon={bagOutline}  className="user-icon" />
            <IonLabel className="aligncenter">Orders</IonLabel>
            <IonIcon  icon={chevronForwardOutline} />
          </IonItem>
          
          <hr className="borderbottom"></hr>
          <br />

          <IonList lines="none">
            <IonItem
              routerLink="/tabs/userprofile/help"
              lines="none"
              className="flexprofile"
              detailIcon="false"
            >
              <IonIcon
                icon={helpCircleOutline}
                className="user-icon"
              />
              <IonLabel className="aligncenter"> Help</IonLabel>
              <IonIcon  icon={chevronForwardOutline} />
            </IonItem>
            <br />

            <IonItem
              routerLink="/tabs/userprofile/aboutus"
              lines="none"
              className="flexprofile"
              detailIcon="false"
            >
              <IonIcon
                icon={informationCircleOutline}
            
                className="user-icon"
              />
              <IonLabel  className="aligncenter"> About us</IonLabel>
              <IonIcon  icon={chevronForwardOutline} />
            </IonItem>
            <br/>
            <hr className="borderbottom"></hr>
            <br />

            <IonItem
              routerLink="/tabs/userprofile/legal"
              lines="none"
              className="flexprofile"
              detailIcon="false"
            >
              <IonIcon
                icon={shieldCheckmarkOutline}
                className="user-icon"
              />
              <IonLabel  className="aligncenter"> Legal</IonLabel>
              <IonIcon  icon={chevronForwardOutline} />
            </IonItem>
          </IonList>

          <br />
          <div className="btnprofile">
          <IonButton
            className="user-logout"
            shape="round"
            expand="block"
           onClick={handleSignoutClick}
          >
            Logout
          </IonButton>
          </div>
          
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

// export default withRouter (UserProfile);

export default connect<OwnProps, DispatchProps>({
  mapDispatchToProps: {

  },
  component: React.memo(UserProfile),
});
