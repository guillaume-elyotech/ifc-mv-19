
import React, { useState, useEffect, useContext } from 'react';
import { IonListHeader,IonContent, IonHeader, IonPage, IonRouterLink, IonAvatar,  IonIcon, IonToolbar, IonButtons,IonList, IonItem, IonBackButton, IonTitle, IonLabel} from '@ionic/react';
import {  chevronBackOutline, earthOutline, homeOutline, informationOutline, logoIonic  } from 'ionicons/icons';

import './UserDetail.scss';

import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore"; 

import { Order } from "../../data/models";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import { useAuthentication, firebaseAuth } from '../../components/Authentication/AuthProvider';


import { camera} from 'ionicons/icons';
import { usePhotoGallery, UserPhoto } from '../../components/Profile/usePhotoGallery';

interface OwnProps { };

interface StateProps {
}

interface DispatchProps { };

interface UserDetailProps extends OwnProps, StateProps, DispatchProps { };

const UserDetail: React.FC<UserDetailProps> = ({ }) => {




  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();

  const { user, errors } = useContext(firebaseAuth);

  const [username, setUsername] = useState<string>(user.email);
  const [fullName, setFullName] = useState<string>(user.displayName);
  const [age, setAge] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [branch, setBranch] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [profilepicture, setProfilepicture] = useState<string>(user.photoURL);
  const [email, SetEmail] = useState<string>(user.email);


  const updateUserData = async (e: React.FormEvent) => {
    e.preventDefault();

  }
  


    return (
        <IonPage id="userdetail-page">

                {/*-- Back button with a default href --*/}
          <IonHeader className="navbar-noborder" >
          <IonToolbar >
          <IonButtons slot="start">
          <IonBackButton icon={chevronBackOutline} defaultHref="/tabs/userprofile/" />
          </IonButtons>

          <IonTitle className="eventdetailstitle">User profile detail</IonTitle>
         
          </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>

          <IonList className="verse_block" lines="none">
             <IonListHeader className="verse_titre">General Information </IonListHeader>
             <br/>
             <br/>
             <br/>


             <IonItem className="user_card" lines="none" key={ user.uid}>
            <IonAvatar slot="start" className="userdetails-img" onClick={() => takePhoto()}>
            <img src={profilepicture} />
            </IonAvatar>

            <IonLabel>
            <h1 className="username"><b> {fullName} </b></h1>
            <h3 className="email"> {email} </h3>
            <br/>
            <IonRouterLink className="text-edit" routerLink="/tabs/userprofile/userdetailupdate" > Update your profile</IonRouterLink>

            </IonLabel>
            </IonItem>

            <IonIcon icon={camera} className="camera-icon"/>

            </IonList>

                <br/>
             <br/>

        <IonList className="verse_block">
             <IonListHeader className="verse_titre">Details </IonListHeader>
             <br/>
             <br/>

             <IonItem>
               <IonIcon icon={earthOutline} slot="start" className="userdetails-icon" />
              <IonLabel className="user-details"> {`Country : ${country}`}</IonLabel>
             </IonItem>
            <IonItem>
            <IonIcon icon={homeOutline} slot="start" className="userdetails-icon"  />
          <IonLabel className="user-details">{`Branch : ${branch}`}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={logoIonic} slot="start" className="userdetails-icon"  />
          <IonLabel className="user-details"> {`Gender : ${gender}`}</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={informationOutline} slot="start" className="userdetails-icon"  />
          <IonLabel className="user-details"> {`Age : ${age}`}</IonLabel>
          </IonItem>
      </IonList>

       
    </IonContent>
                


        </IonPage>
        
        
  );
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
  }),
  mapDispatchToProps: {
  },
  component: React.memo(UserDetail)
});
