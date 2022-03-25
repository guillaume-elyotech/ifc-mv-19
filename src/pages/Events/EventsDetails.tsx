import React from "react";
import {
  IonBackButton,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonTitle,
  IonText,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonItem,
  IonCardTitle,
  IonCardHeader,
} from "@ionic/react";
import {
  chevronBackOutline,
  locationOutline,
  pricetagsOutline,
} from "ionicons/icons";
import "./EventsDetails.scss";
import { RouteComponentProps } from "react-router";

import { Event } from "../../data/models";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";

interface OwnProps extends RouteComponentProps {
  eventdetail: Event;
}

interface StateProps {}

interface DispatchProps {}

interface EventDetailProps extends OwnProps, StateProps, DispatchProps {}

const EventDetails: React.FC<EventDetailProps> = ({ eventdetail }) => {

  if (!eventdetail) {
    <div> No event to display</div>
  }

  const displayDate = (date1? : Date, date2?: Date) => {
    var vdate : string;
    
    if (date1 !== null) {
      if (date1 === date2) {
        vdate = ""+date1?.toDateString();
        return vdate;
      }
      else {
        vdate = ""+date1?.toDateString()+" - "+date2?.toDateString();
        return vdate;
      }
    }
    return null;
  }
  
  return (
    <IonPage id="eventdetails-page">
      {/*-- Back button with a default href --*/}
      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton icon={chevronBackOutline} defaultHref="/tabs/home"  text="" className="ios iosbackbtn"/>
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents"> Upcoming Events</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="event-details-card">
          <img
            src={eventdetail?.imgsrc}
            alt={eventdetail?.location}
            className="eventdetails-img"
          />
          <IonCardHeader>
            <IonCardTitle className="ios iospaddingbottom5"> {eventdetail?.title} </IonCardTitle>
            <IonCardSubtitle className="date_eventdetails ios iospaddingbottom5">
            {`${eventdetail?.startdate.toDateString()} - ${eventdetail?.enddate.toDateString()}`}
            {/*** changer la date avec to date ou t */}
            </IonCardSubtitle>
            <IonCardSubtitle>{eventdetail?.location}</IonCardSubtitle>
      
          </IonCardHeader>
          <IonCardContent> {eventdetail?.description}</IonCardContent>

          <div className="event_flex md androidpaddingbtm" >
          <IonItem lines="none" >
            <IonIcon
              icon={locationOutline}
              slot="start"
              className="gps-icons ios iosicongps md androidgpsicon"
              
            />
            <IonText slot="start" className="location_eventdetails oneligne">
              
              {`Venue : ${eventdetail?.address}`}
            </IonText>
          </IonItem>


          <IonItem lines="none"   className="price_events">
            <IonIcon
              icon={pricetagsOutline}
              slot="start"
              className="event-icon"
            />
            
            <IonText slot="start" className="price_eventdetails oneligne md androidtextevents">
              
              {eventdetail?.price}   
              {
                isNaN(eventdetail?.price)
                  ? ""
                  : eventdetail?.currencycode
              } 
            </IonText>
          </IonItem>

          </div>
          

        </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

//export default  EventDetails;


export default connect({
  mapStateToProps: (state, ownProps) => ({
    eventdetail: selectors.getEvent(state, ownProps)
  }),
  component: EventDetails
});