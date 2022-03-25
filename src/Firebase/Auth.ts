import  { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword , signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import {  SignupPageMethods } from "./FirebaseApi";
import {app, auth} from './Firebase';

//import { DEFAULT_ITEMS } from './data/items'
import { COLLECTIONS, LOCAL_STORAGE } from './firebase.constants';





export const authMethods = {

  signup : async ( firstName: string, lastName: string,email:string, password : string, setErrors:any,
  setUser:any)  => {
  try {
        const auth = getAuth(app);

        createUserWithEmailAndPassword (auth, email, password)
        .then( userCredential => {
                 // Signed in 
                 const user = userCredential.user;
                 console.log(user); 
                  // update name
                  setUser(user)
                  setErrors([])

                  updateProfile(user, {displayName: firstName+" "+lastName, }).then(() => {
                    console.log("Profil updated");
                    console.log(user);
                  }).catch((error) => {
                    // An error occurred
                    console.log("Error while updating the user profile");
                    setErrors(prev => ([...prev, error.message]));


                  });
                
                // create user in firestore database
                SignupPageMethods.PostUser(user.uid, user.email, firstName,lastName,"","","","" );

     }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // On affiche l'erreur
        console.log(errorCode + " : " + errorMessage);
        setErrors(prev => ([...prev, error.message]));


   })}
   catch(e){
    console.log(e)
    const errorCode = e.code;
    const errorMessage = e.message;  
    setErrors(prev => ([...prev, errorMessage]))
  }},

login: async (email:string, password:string, setErrors:any, setUser:any) => {
       try{
         const auth = getAuth(app);

        return signInWithEmailAndPassword(auth,email,password)
                          .then((userCredential) => {
                                const user = userCredential.user
                                console.log(user)
                                setUser(user)
                                setErrors([])

            })
       }
       catch(e){
        console.log(e)
        const errorCode = e.code;
        const errorMessage = e.message;
        setErrors(prev => ([...prev, errorMessage]))
        return e;
       }
    },

  signout : async (setErrors, setUser) => {
    try{
      
      const auth = getAuth(app);
      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User signed out", auth.currentUser);
        console.log("End of the session")
         // set the token back to original state
      setUser(null);
      setErrors([]);

      })}
    catch(e){
        console.log(e)
        const errorCode = e.code;
        const errorMessage = e.message;

             // there shouldn't every be an error from firebase but just in case
      setErrors(prev => ([...prev, errorMessage]))
      // whether firebase does the trick or not i want my user to do there thing.
      //localStorage.removeItem(LOCAL_STORAGE.TOKEN)
      setUser(null)
    }
  },

  observe: async (setUser:any) => {

    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }
}