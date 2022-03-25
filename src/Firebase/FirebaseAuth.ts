
import  {signInWithEmailAndPassword  , createUserWithEmailAndPassword , signOut, updateProfile } from "firebase/auth";
import { UserAccount } from "../data/models";
import {  SignupPageMethods } from "./FirebaseApi";
import {auth} from './Firebase';

import { getAuth} from "firebase/auth";


export const createUserAccount = async ( firstName: string, lastName: string,email:string, password : string) => {
  try {
        return createUserWithEmailAndPassword (auth, email, password)
        .then( userCredential => {
                 // Signed in 
                 const user = userCredential.user;
                 console.log(user); 
                  // update name
                  updateProfile(user, {displayName: firstName+" "+lastName, }).then(() => {
                    console.log("Profil updated");
                    console.log(user);
                  }).catch((error) => {
                    // An error occurred
                    console.log("Error while updating the user profile");
                    return error;

                  });
                
                // create user in firestore database
                SignupPageMethods.PostUser(user.uid, user.email, firstName,lastName,"","","","" );

     }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // On affiche l'erreur
        console.log(errorCode + " : " + errorMessage);
        return error;
   })}
   catch(e){
    console.log(e)
    const errorCode = e.code;
    const errorMessage = e.message;  
    return e;
   }
  }


    export const LoginWithEmailAndPassword = async (email:string, password:string) => {
       try{
           return signInWithEmailAndPassword(auth,email,password)
                          .then((userCredential) => {
                                const user = userCredential.user
                                console.log(user)

                                /*
                                const  users: User[] = []
                                const newUser = {
                                    uid: user.uid,
                                    lastname : user
                                    email: user.email,
                                  }
                                  console.log(users)
                                  users.push(newUser);
                                  return(users); */
            })
       }
       catch(e){
        console.log(e)
        const errorCode = e.code;
        const errorMessage = e.message;
        return e;
      //return [];
       }
    }




  export const signOutUser = async () => {
    try{
      return signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User signed out", auth.currentUser);
        console.log("End of the session")
      })}
    catch(e){
      console.log("Error while trying to sign out", e)
        console.log(e)
        const errorCode = e.code;
        const errorMessage = e.message;
        return e;
    }
  }

