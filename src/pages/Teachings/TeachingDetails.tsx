import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonBackButton,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import "./TeachingDetails.scss";
import { RouteComponentProps } from "react-router";

import { TeachingLesson } from "../../data/models";

import { connect } from "../../data/connect";

import * as selectors from "../../data/selectors";

import svgButton from "./teaching-square-button.svg"

interface OwnProps extends RouteComponentProps {
  teachingdetails?: TeachingLesson;
}

interface StateProps { }

interface DispatchProps { }

interface TeachingDetailsProps extends OwnProps, StateProps, DispatchProps { }

const TeachingDetails: React.FC<TeachingDetailsProps> = ({
  teachingdetails
}) => {

  if (!teachingdetails) {
    <div>The is no teaching to display</div>;
  }

  console.log("la lesson selectionée est : ");
  console.log(teachingdetails);

  console.log(
    "la categorie de la lecon selectionée est : ",
    teachingdetails?.category
  );
  console.log(teachingdetails?.idcat);

  const mydate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(teachingdetails?.date);
  let date = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(teachingdetails?.date);



  return (
    <IonPage id="eventdetails-page">
      {/*-- Back button with a default href --*/}
      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref={`/tabs/teaching/teachinglist/${teachingdetails?.idcat}`}
              key={teachingdetails?.idcat}
              text=""
              className="black ios iosbackbtn"
            ></IonBackButton>
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents">
            {" "}
            {`${teachingdetails?.category} teachings`}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard className="box">
          <IonImg  src={teachingdetails?.imgsrc} alt={teachingdetails?.title} />
          <IonCardHeader>
            <IonCardTitle className="ios iospaddingbottom5"> {teachingdetails?.title}</IonCardTitle>
            <IonCardSubtitle className="date_eventdetails">{`${teachingdetails?.price} ${date} `}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent> {`${teachingdetails?.text}`} </IonCardContent>
        </IonCard>

        <div className="content"></div>
        <IonFab vertical="bottom" horizontal="center" slot="fixed" className="svgButton">
          <IonFabButton className="svgButtonBg">
            <IonIcon className="svgIcon" icon={svgButton}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};


export default connect({
  mapStateToProps: (state, ownProps) => ({
    teachingdetails: selectors.getLesson(state, ownProps),
  }),
  component: React.memo(TeachingDetails),
});

/*
export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, ownProps) => ({
    teachingdetails: selectors.getLesson(state, ownProps),
  }),
  mapDispatchToProps: {},
  component: React.memo(TeachingDetails),
});
*/


