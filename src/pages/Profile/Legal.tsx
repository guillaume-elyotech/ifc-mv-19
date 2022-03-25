import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
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
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import "./Legal.scss";
import { chevronBackOutline } from "ionicons/icons";
//import AboutPopover from '../components/AboutPopover';

import { connect } from "../../data/connect";

import svgButton from './teaching-square-button.svg'

interface OwnProps { }

interface StateProps { }

interface DispatchProps { }

interface AboutProps extends OwnProps, StateProps, DispatchProps { }

const Legal: React.FC<AboutProps> = () => {
  const [location, setLocation] = useState<
    | "Bujumbura"
    | "Kinshasa"
    | "Lubumbashi"
    | "Chipata"
    | "Lusaka"
    | "Durban"
    | "Johannesburg"
  >("Bujumbura");
  const [loca, setLoca] = useState();

  const selectOptions = {
    header: "Select a branch",
  };

  let currentAddress = "" as string;
  let currentContact = "" as string;

  let add = "" as string;
  let con = "" as string;
  let facebookUrl = "" as string;
  let instagramUrl = "" as string;
  let twitterUrl = "" as string;
  let youtubeUrl = "" as string;

  console.log(location);

  return (
    <IonPage id="about-page">
      <IonHeader translucent no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton 
              icon={chevronBackOutline}
              defaultHref="/tabs/userprofile"
              text="" className="ios iosbackbtn black Back"
            />
          </IonButtons>
          <IonTitle className="eventdetailstitle ios iostextevents"> PRIVACY POLICY </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="ppContent">
          <div>
            <p className="left">Effective date: January 04, 2019</p>
            <p>Impact for Christ Ministries ("us", "we", or "our") operates the http://www.impactforchristsa.com website (the "Service").</p>
            <p>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
            <p>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from http://www.impactforchristsa.com</p>
          </div>
          <div> {/* Information Collection And Use */}
            <h1>Information Collection And Use</h1>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h2>Types of Data Collected</h2>
            <h3>Personal Data</h3>
            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
              <ul>
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </p>
            <h2>Usage Data</h2>
            <p>We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
            <h3>Tracking & Cookies Data</h3>
            <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</p>
            <p>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</p>
            <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</p>
            <p>Examples of Cookies we use :
              <ul>
                <li><strong>Session Cookies.</strong> We use Session Cookies to operate our Service.</li>
                <li><strong>Preference Cookies</strong>We use Preference Cookies to remember your preferences and various settings.</li>
                <li><strong>Security Cookies</strong>We use Security Cookies for security purposes.</li>
              </ul>
            </p>
          </div>
          <div> {/* Use of Data */}
            <h1>Use of Data</h1>
            <p>Impact for Christ Ministries uses the collected data for various purposes:
              <ul>
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </p>
          </div>
          <div> {/* Transfer Of Data */}
            <h1>Transfer Of Data</h1>
            <p>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</p>
            <p>If you are located outside South Africa and choose to provide information to us, please note that we transfer the data, including Personal Data, to South Africa and process it there.</p>
            <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
            <p>Impact for Christ Ministries will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
          </div>
          <div> {/* Disclosure Of Data */}
            <h1>Disclosure Of Data</h1>
            <h2>Legal Requirements</h2>
            <p>Impact for Christ Ministries may disclose your Personal Data in the good faith belief that such action is necessary to:
              <ul>
                <li>To comply with a legal obligation</li>
                <li>To protect and defend the rights or property of Impact for Christ Ministries</li>
                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                <li>To protect the personal safety of users of the Service or the public</li>
                <li>To protect against legal liability</li>
              </ul>
            </p>
          </div>
          <div> {/* Security Of Data */}
            <h1>Security Of Data</h1>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          </div>
          <div> {/* Service Providers */}
            <h1>Service Providers</h1>
            <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</p>
            <p>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
            <h2>Analytics</h2>
            <p>We may use third-party Service Providers to monitor and analyze the use of our Service.</p>
            <p><strong>Google Analytics</strong></p>
            <p>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network.</p>
            <p>You can opt-out of having made your activity on the Service available to Google Analytics by installing the Google Analytics opt-out browser add-on. The add-on prevents the Google</p>
            <p>Analytics JavaScript (ga.js, analytics.js, and dc.js) from sharing information with Google Analytics about visits activity.</p>
            <p>For more information on the privacy practices of Google, please visit the Google Privacy & Terms web page : <a href="https://policies.google.com/privacy?hl=en">https://policies.google.com/privacy?hl=en</a></p>
          </div>
          <div> {/* Links To Other Sites */}
            <h1>Links To Other Sites</h1>
            <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>
            <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
          </div>
          <div> {/* Children's Privacy */}
            <h1>Children's Privacy</h1>
            <p>Our Service does not address anyone under the age of 18 ("Children").</p>
            <p>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
          </div>
          <div> {/* Changes To This Privacy Policy */}
            <h1>Changes To This Privacy Policy</h1>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            <p>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</p>
            <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
          </div>
          <div> {/* Contact Us */}
            <h1>Contact Us</h1>
            <p>If you have any questions about this Privacy Policy, please contact us by mail : <a href="mailto: support@impactforchristsa.com"><strong>support@impactforchristsa.com</strong></a></p>
          </div>
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
  mapStateToProps: (state) => ({}),
  mapDispatchToProps: {},
  component: React.memo(Legal),
});