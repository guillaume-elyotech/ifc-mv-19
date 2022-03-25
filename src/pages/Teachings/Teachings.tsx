import React from "react";
import {
  IonContent,
  IonPage,
  IonText,
  IonCard,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonFab, 
  IonFabButton,
  IonIcon,
  IonItem,
} from "@ionic/react";
import "./Teachings.scss";
import * as selectors from "../../data/selectors";
import { Teaching } from "../../data/models";
import { connect } from "../../data/connect";

import svgButton from "./teaching-square-button.svg";

interface OwnProps {}

interface StateProps {
  teachingslist?: Teaching[];
}

interface DispatchProps {}

interface TeachingProps extends OwnProps, StateProps, DispatchProps {}

const TeachingPage: React.FC<TeachingProps> = ({ teachingslist }) => {

  console.log("Liste des teachings");
  console.log(teachingslist);
  return (
    <IonPage id="teaching-page">
      <IonContent fullscreen>
        <IonCard className="teaching-title">
          <IonCardTitle className="titre">Find teaching</IonCardTitle>
          <IonCardSubtitle className="titre_text">
            Choose the topic you want to explore
          </IonCardSubtitle>
        </IonCard>

        <IonCard className="emptycard">

         <IonItem lines="none" className="item_cat_teachings">
           <IonText className="text_cat_teachings">Categories</IonText>
         </IonItem>

          <IonGrid className="custom_grid">
            <IonRow className="row_grid">
              {teachingslist?.map((teachingcategorie, i) => (
                <IonCol sizeLg="4" sizeMd="6" sizeXs="6" key={i}
                >
                  <IonCard
                    className={i % 2 === 0 ? "one" : "two"}
                    key={i}
                    routerLink={`/tabs/teaching/teachinglist/${teachingcategorie.id}`}
                  >
                    <img
                      src={teachingcategorie.imgsrc}
                      className="img_cardteaching"
                      alt={teachingcategorie.category}
                      key={i}
                    ></img>
                    <br />
                    <IonText className="card_titre">
                      {teachingcategorie.category}
                    </IonText>
                    <br />
                    <IonText className="card_text">{`${teachingcategorie.count} texts`}</IonText>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
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

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    teachingslist: selectors.getTeachings(state),
    //teachinglist: state.data.teachings
  }),
  mapDispatchToProps: {},
  component: React.memo(TeachingPage),
});
