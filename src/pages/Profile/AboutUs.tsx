import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonRouterLink,
  IonPage,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSelectOption,
  IonList,
  IonItem,
  IonSelect,
  IonText,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import "./AboutUs.scss";
import { chevronBackOutline } from "ionicons/icons";
//import AboutPopover from '../components/AboutPopover';
import { Icon } from "@iconify/react";

import { connect } from "../../data/connect";

import { Branch } from "../../data/models";

import svgButton from "./teaching-square-button.svg";

interface OwnProps {}

interface StateProps {
  brancheslist? : Branch[];
}

interface DispatchProps {}

interface AboutProps extends OwnProps, StateProps, DispatchProps {}

const About: React.FC<AboutProps> = ({ brancheslist }) => {
  const [location, setLocation] = useState<
    | "Bujumbura"
    | "Kinshasa"
    | "Lubumbashi"
    | "Chipata"
    | "Lusaka"
    | "Durban"
    | "Johannesburg"
    | "Paris"

  >("Bujumbura");
  

  const selectOptions = {
    header: "Select a branch",
  };

  let add = "" as string;
  let con = "" as string;
  let facebookUrl = "" as string;
  let instagramUrl = "" as string;
  let twitterUrl = "" as string;
  let youtubeUrl = "" as string;

  const site = brancheslist?.find((site) => site.location === location);
  if (site) {
    add = site.address;
    con = site.contact;
    facebookUrl = site.facebookUrl;
    instagramUrl = site.instagramUrl;
    twitterUrl = site.twitterUrl;
    youtubeUrl = site.youtubeUrl;
  }

  console.log(location);

  return (
    <IonPage id="about-page">

      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              icon={chevronBackOutline}
              defaultHref="/tabs/userprofile"
              text="" className="ios iosbackbtn black"
            />
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents"> {location}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      
        <IonButtons>
          <IonBackButton defaultHref="/tabs/userprofile" className="back" />
        </IonButtons>

        <div className="about-header">
          {/* Instead of loading an image each time the select changes, use opacity to transition them */}
          <div
            className="about-image"
            style={{ opacity: location === "Bujumbura" ? "1" : undefined }}
          >
            {" "}
            <img src="/assets/img/bujumbura.jpg"  alt="img-ville" key='{bujumbura'
/>{" "}
            <IonText>{location}</IonText>
          </div>
          <div
            className="about-image"
            style={{ opacity: location === "Kinshasa" ? "1" : undefined }}
          >
            {" "}
            <img src="/assets/img/kinshasa.jpg" alt="img-ville" key='{kinshasa' />
          </div>
          <div
            className="about-image"
            style={{ opacity: location === "Lubumbashi" ? "1" : undefined }}
          >
            <img src="/assets/img/lubumbashi.jpg" alt="img-ville"/>
          </div>
          <div
            className="about-image"
            style={{ opacity: location === "Chipata" ? "1" : undefined }}
          >
            <img src="/assets/img/chipata.jpg" alt="img-ville"/>
          </div>
          <div
            className="about-image"
            style={{ opacity: location === "Lusaka" ? "1" : undefined }}
          >
            <img src="/assets/img/lusaka.jpg" alt="img-ville"/>
          </div>
          <div
            className="about-image"
            style={{ opacity: location === "Durban" ? "1" : undefined }}
          >
            <img src="/assets/img/durban.jpg" alt="img-ville"/>
          </div>
          <div
            className="about-image"
            style={{ opacity: location === "Johannesburg" ? "1" : undefined }}
          >
            <img src="/assets/img/johannesburg.jpg" alt="img-ville"/>
          </div>
          <div
            className="about-image"
            style={{ opacity: location === "Paris" ? "1" : undefined }}
          >
            <img src="/assets/img/paris.jpeg" alt="img-ville"/>
          </div>
        </div>
        <div className="about-info">
          <h3 className="ion-padding-top ion-padding-start">
            About Impact For Christ Ministries
          </h3>

          <p className="aboutus">
            Who we are? Impact for Christ Ministries is a revelation of the
            Church of the Lord Jesus Christ, governed by Him as the Head,
            according to the enunciation of the Holy Scriptures, the working of
            the Holy Spirit and the ministrations instituted by Jesus Himself.
            We are a ministry of the Lord Jesus Christ, where His name is lifted
            up high and His limitless power demonstrated – According to John
            14:12, “Doing the works of Jesus Christ and greater works than He
            did for those who believe in Him.” Vision John 14:12, “Doing the
            Works of Jesus Christ” Most assuredly, I say to you, he who believes
            in Me, the works that I do he will do also and greater works than
            these he will do, because I go to My Father.” Mission
          </p>

          <h3 className="ion-padding-top ion-padding-start">Details</h3>

          <IonList lines="none">
            <IonItem>
              <IonCol size="3" slot="start">
                Location
              </IonCol>

              {/* <IonSelect value={location} interface="action-sheet" interfaceOptions={selectOptions} onIonChange={(e) => setLocation(e.detail.value as any)}>
                <IonSelectOption value="Bujumbura">Bujumbura, BURUNDI</IonSelectOption>
                <IonSelectOption value="Kinshasa">Kinshasa, DRC</IonSelectOption>
                <IonSelectOption value="Lubumbashi">Lubumbashi, DRC</IonSelectOption>
                <IonSelectOption value="Chipata">Chipata, ZAMBIA</IonSelectOption>
                <IonSelectOption value="Lusaka">Lusaka, ZAMBIA</IonSelectOption>
                <IonSelectOption value="Durban">Durban, SA</IonSelectOption>
                <IonSelectOption value="Johannesburg">Johannesburg, SA</IonSelectOption>

              </IonSelect>
            */}

              <IonSelect
                value={location}
                interface="action-sheet"
                interfaceOptions={selectOptions}
                onIonChange={(e) => setLocation(e.detail.value as any)}
              >
                {brancheslist?.map((branch, i) => (
                  <IonSelectOption value={branch.location}>
                    {branch.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonCol size="12" slot="start" className="aboutus-details">
                {` Physical Address: ${add}`}
              </IonCol>
            </IonItem>
            <IonItem>
              <IonCol size="12" slot="start" className="aboutus-details">
                {`Contact : ${con}`}
              </IonCol>
            </IonItem>
          </IonList>

          <h3 className="ion-padding-top ion-padding-start">Social Media</h3>
          <IonItem lines="none">
            <IonCol size="3">
              <a href={`${facebookUrl}`}>
                <Icon icon="bi:facebook" color="#3b5998" width="30" />
              </a>
            </IonCol>
            <IonCol size="3">
              <IonRouterLink href={`${instagramUrl}`} target="_blank">
                {" "}
                <Icon
                  icon="simple-icons:instagram"
                  color="#e1306c"
                  width="30"
                />
              </IonRouterLink>
            </IonCol>
            <IonCol size="3">
              <a href={`${twitterUrl}`} target="_blank" rel="noreferrer">
                {" "}
                <Icon icon="logos:twitter" color="#e1306c" width="30" />
              </a>
            </IonCol>
            <IonCol size="3">
              <IonRouterLink href={`${youtubeUrl}`} target="_blank">
                <Icon icon="logos:youtube" color="#e1306c" width="50" />
              </IonRouterLink>
            </IonCol>
          </IonItem>
        </div>
        <IonFab vertical="bottom" horizontal="center" slot="fixed" className="svgButton">
          <IonFabButton href="/tabs/teaching" className="svgButtonBg">
            <IonIcon className="svgIcon" icon={svgButton}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    brancheslist: state.data?.branches,
  }),
  mapDispatchToProps: {},
  component: React.memo(About),
});