import React from "react";
import {
  IonBackButton,
  IonContent,
  IonPage,
  IonButtons,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
} from "@ionic/react";

import "./TeachingList.scss";
import { RouteComponentProps } from "react-router";
import { Teaching, UnlockedTeaching } from "../../data/models";
//import { connect } from 'react-redux';

import { connect } from "../../data/connect";

import * as selectors from "../../data/selectors";
import TeachingListItem from "./TeachingListItem";

import svgButton from "./teaching-square-button.svg";
import { chevronBackOutline } from "ionicons/icons";

interface OwnProps extends RouteComponentProps {
  teachingcat?: Teaching;
}

interface StateProps {
  myunlockedteachings: number[];
}

interface DispatchProps { };

interface TeachingListProps extends OwnProps, StateProps, DispatchProps { }

//interface TeachingListProps extends OwnProps, StateProps, DispatchProps {};
const TeachingList: React.FC<TeachingListProps> = ({
  teachingcat,
  myunlockedteachings,
}) => {
  //console.log("here is the teaching categorie selected");
  //console.log(teachingcat);
  //const lessons = parseLessonsItem(teachingcat);
  //console.log(lessons);
  if (!teachingcat) {
    <div>No teaching category selected </div>
  }

  console.log("my unlocked teachings are : ", myunlockedteachings);

  if (!teachingcat) {
    return <div>Teaching category not found</div>;
  }
  return (
    <IonPage id="teachinglist-page">
      <IonContent fullscreen>
        <IonCard className="box ios iospaddingbtm" key={teachingcat.id}>
          <IonButtons>
            <IonBackButton icon={chevronBackOutline}  defaultHref="/tabs/teaching" className="back black" text=""/>
          </IonButtons>
          <IonImg
            src={teachingcat.imgsrc}
            alt={teachingcat.category}
            className="img_love"
          ></IonImg>
          <div className="Texte_teaching">
            <IonText className="text_categorie">Teaching</IonText>
            <IonCardSubtitle className="text_cat_teaching">
              {teachingcat.category}
            </IonCardSubtitle>
            <IonCardHeader className="text_nombre">{`${teachingcat.count} texts`}</IonCardHeader>
          </div>
          <IonText className="text_title">All texts</IonText>
          <p>&nbsp;</p>

          <IonList className="card_techinglist">
            {teachingcat.lessons.map((lessonitem, i) => (
              <div key={i} >
                <TeachingListItem
                  isUnlocked={myunlockedteachings.indexOf(lessonitem.id) > -1}
                  lessonitem={lessonitem}
                  key={`group-${lessonitem?.idcat}-${lessonitem?.id}`}
                />
              </div>

            ))}
          </IonList>
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
    teachingcat: selectors.getTeachingList(state, ownProps),
    myunlockedteachings: state.data?.myunlockedteachings,
  }),

  mapDispatchToProps: {},
  component: React.memo(TeachingList),
});

