import React, { useState, useContext } from "react";
import { ActionSheetButton } from "@ionic/core";
import {
  IonThumbnail,
  IonContent,
  IonIcon,
  IonPage,
  IonToolbar,
  IonFab,
  IonFabList,
  IonFabButton,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonListHeader,
} from "@ionic/react";
import {
  bookmarkSharp,
  shareSocialOutline,
  chevronBackCircleOutline,
  copyOutline,
} from "ionicons/icons";

import { Event, PropheticMessage, VerseOfToday } from "../../data/models";
import { connect } from "../../data/connect";
import {auth } from "../../Firebase/Firebase";
import { getAuth} from "firebase/auth";
import { useAuthentication, firebaseAuth } from '../../components/Authentication/AuthProvider';
import { useHistory } from "react-router-dom";

import "./Homepage.scss";

import svgButton from "./teaching-square-button.svg";
import { Clipboard } from '@capacitor/clipboard';
interface OwnProps {}

interface StateProps {
  events?: Event[];
  propheticmessage?: PropheticMessage;
  verseoftoday?: VerseOfToday;
}

interface DispatchProps {}

interface HomePageProps extends OwnProps, StateProps, DispatchProps {}

const Homepage: React.FC<HomePageProps> = ({
  events,
  propheticmessage,
  verseoftoday,
}) => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [actionSheetButtons, setActionSheetButtons] = useState<
    ActionSheetButton[]
  >([]);
  const [actionSheetHeader, setActionSheetHeader] = useState("");

  const history = useHistory();

  const { user } = useAuthentication();




  //const auth = getAuth();
  //const user = auth.currentUser;
  var fullname: any;
  if (user){
    fullname = user?.displayName;
  } else {
    fullname = "";
  }

  console.log("Liste des variables");
  console.log(events);
  console.log(propheticmessage);
  console.log(verseoftoday);
  console.log("my user is : ", user);


  /*
  if (user) {
    user.providerData.forEach((profile) => {
      //var uid = profile.uid;
      // var email = profile.email;
      if (profile.displayName != null) {
        fullname = profile.displayName;

        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      } else {
        fullname = " ";
      }
    });
  } else {
    fullname = "  ";
  }
*/
const writeToClipboard = async (text : any) => {
  await Clipboard.write({
    string: text /* {propheticmessage?.text} */
  });
};

const checkClipboard = async () => {
  const { type, value } = await Clipboard.read();

  console.log(`Got ${type} from clipboard: ${value}`);
};

  const greetings = () => {
    var today = new Date();
    var curHr = today.getHours();
    if (user)
    {
    if (curHr < 12) {
      console.log("good morning");
      return "Good morning";
    } else if (curHr < 18) {
      console.log("good afternoon");
      return "Good afternoon";
    } else {
      console.log("good evening");
      return "Good evening";
    }
  } else return "";
  };



  function openPropheteicMsgShare(message: PropheticMessage) {
    if (!message ){
      setShowActionSheet(false);
    } else {
      
    setActionSheetButtons([
      {
        text: "Copy Link",
        handler: () => {
          console.log("Copy Link clicked");
        },
      },
      {
        text: "Share via ...",
        handler: () => {
          console.log("Share via clicked");
        },
      },
      {
        text: "Cancel",
        role: "cancel",
        handler: () => {
          console.log("Cancel clicked");
        },
      },
    ]);
    setActionSheetHeader(`Share ${message.text}`);
    setShowActionSheet(true);
  }
}

  return (
    <IonPage id="home-page">
      <IonToolbar className="bgWhite">
        <img src="/assets/img/ifcm_logo.png" className="logo"  alt="logo-ifcm"/>
        <br />
        <br />
        <IonText className="home_title">
          {" "}
          {`${greetings()} ${fullname}`},{" "}
        </IonText>
      </IonToolbar>
      <br />
      <br />

      <IonContent fullscreen={true} className="content">
        <IonCard className="home_emptcard">
          <IonCardContent className="home_contentcard">
            <br />
            <br />

            <IonList className="verse_block" lines="none">
              <IonListHeader className="verse_titre">
                Verse of the day{" "}
              </IonListHeader>
              <br />

              <IonItem className="home-item">
                <IonButton className="verse-button">
                  <IonIcon
                    icon={bookmarkSharp}
                    className="blue-icon"
                    slot="start"
                  />
                  <IonLabel className="verse_auteur">
                    {" "}
                    {verseoftoday?.verse}{" "}
                  </IonLabel>
                </IonButton>
              </IonItem>

              <IonItem>
                <IonLabel className="verse_texte">
                  {" "}
                  {`«${verseoftoday?.text}»`}
                </IonLabel>
              </IonItem>
            </IonList>

            <br />
            <br />
            <IonList className="event" lines="none">
              <IonListHeader className="event_titre">
                Upcoming Events{" "}
              </IonListHeader>
              <br />
              <br />
              {events?.map((eventdetails, i) => (
                <IonItem
                  className="event_card"
                  key={i}
                  routerLink={`/tabs/home/eventdetails/${eventdetails.id}`}
                >
                  <IonThumbnail slot="start" className="img">
                    <img src={eventdetails.imgsrc} className="event-img"  alt="img-event"/>
                  </IonThumbnail>
                  <IonLabel>
                    <h3 className="date_event">
                    <b> {`${eventdetails?.startdate} - ${eventdetails?.enddate}`} </b>
                    </h3>
                    <h2 className="lieu_event"> {eventdetails.title} </h2>
                    <p className="text_event"> {eventdetails.shortdesc} </p>
                  </IonLabel>
                </IonItem>
              ))}
              <br />
              <br />
              <br />
            </IonList>
          </IonCardContent>
        </IonCard>
        <br />
        <br />
        <IonCard className="prophetic_card">
          <IonCardContent className="propheticcontent">
            <IonText color="light" className="prophetic-message">
              <h4>
                <b>{propheticmessage?.title} </b>
              </h4>
              <br />
              <h5>{propheticmessage?.text} </h5>
              <br />
              {propheticmessage?.author}
              <br />
              <br />
            </IonText>

            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton>
                <IonIcon icon={chevronBackCircleOutline}></IonIcon>
              </IonFabButton>
              <IonFabList side="top">
                <IonFabButton onClick={() => writeToClipboard(propheticmessage?.text)}>
                  <IonIcon
                    className="prophet-icon"
                    icon={copyOutline}
                  ></IonIcon>
                </IonFabButton>
              </IonFabList>
            </IonFab>
          </IonCardContent>
        </IonCard>
        <img src="./assets/img/quotes.png" className="quotes" alt="double"/>

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

//export default withRouter (Homepage);

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    events: state.data?.events,
    propheticmessage: state.data?.propheticmessage,
    verseoftoday: state.data?.verseoftoday,
  }),
  mapDispatchToProps: {},
  component: React.memo(Homepage),
});
