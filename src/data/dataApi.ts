
   
import { Storage } from "@capacitor/storage";
import { Teaching, TeachingLesson, UserAccount } from "./models";
import {SignupPageMethods} from "../Firebase/FirebaseApi";
import { getAuth } from "firebase/auth";
import {app, auth} from '../Firebase/Firebase';


const HAS_LOGGED_IN = "hasLoggedIn";
const USERNAME = "username";

const dataUrl2 = "/assets/data/locations.json";


  
  export function parseLessons(teachings: Teaching[]) {
    const lessons: TeachingLesson[] = [];
    teachings.forEach((g) => {
      console.log(g);
      g.lessons.forEach((s:any) => lessons.push(s));
    });
    console.log("lessons");
    console.log(lessons);
  
    return lessons;
  }


  export const getUserData = async () => {

  //const auth = getAuth(app);
  const auth = getAuth();
  const user = auth.currentUser;
  let userData : any;
  if (user){
    const userUid = user.uid;
    if (userUid != null && userUid != undefined) {
       userData = await SignupPageMethods.getUserProfile(userUid);
    }
    else  {
      console.log("The user uid is not defined : ", userUid)
    } 

  }
  else {
    console.log("The user is not defined : ", user);
  }
    

    const response = await Promise.all([
      Storage.get({ key: HAS_LOGGED_IN }),
      Storage.get({ key: USERNAME })]);
    const isLoggedin = await response[0].value === 'true';
    const username = await response[1].value || undefined;
    const data = {
      isLoggedin,
      username,
      userData
      
    }
    return data;
  }
  
  export const setIsLoggedInData = async (isLoggedIn: boolean) => {
    await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
  }
  
  export const setUsernameData = async (username?: string) => {
    if (!username) {
      await Storage.remove({ key: USERNAME });
    } else {
      await Storage.set({ key: USERNAME, value: username });
    }
  }