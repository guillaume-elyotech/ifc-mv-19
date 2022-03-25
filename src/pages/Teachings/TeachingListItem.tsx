import React from "react";
import { IonIcon, IonText, IonCard } from "@ionic/react";
import { TeachingLesson } from "../../data/models";
import { lockClosedOutline, lockOpenOutline } from "ionicons/icons";
import "./TeachingListItem.scss";

interface TeachingListitemProps {
  lessonitem: TeachingLesson;
  isUnlocked: boolean;
  key: string;
}

const TeachingListItem: React.FC<TeachingListitemProps> = ({
  isUnlocked,
  lessonitem,
  key,
}) => {
  return (
    <IonCard
      className="card_teach"
      key={key}
      routerLink={
        isUnlocked
          ? `/tabs/teaching/teachinglist/teachingdetails/${lessonitem.idcat}/${lessonitem.id}`
          : lessonitem.lock
          ? `/tabs/teaching/teachingorder/${lessonitem.idcat}/${lessonitem.id}`
          : `/tabs/teaching/teachinglist/teachingdetails/${lessonitem.idcat}/${lessonitem.id}`
      }
    >
      <img src={lessonitem.imgsrc} className="img_card" alt={lessonitem.title}></img>
      <IonText className="text_card">{lessonitem.title} </IonText>
{/*     
      <br/>
 <IonText className="date_card">{lessonitem.date.toLocaleString} </IonText>
      <IonText>
        {" "}
        lock is here {`${lessonitem.lock}`} and unlock is {`${isUnlocked}`}
      </IonText>
*/}
      {lessonitem.lock && !isUnlocked && (
        <div>
          <IonIcon
            slot="end"
            icon={lockClosedOutline}
            className="icon_locked"
          />
          <div id="cercle"></div>
        </div>
      )}
      {lessonitem.lock && isUnlocked && (
        <div>
          <IonIcon
            slot="end"
            icon={lockOpenOutline}
            className="icon_locked green bkg_green"
          />
          <div id="bkg_green"></div>
        </div>
      )}
    </IonCard>
  );
};

export default React.memo(TeachingListItem);
