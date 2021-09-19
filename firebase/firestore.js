import { hideNavLinks, showNavLinks , hideSignOut } from "../js/navigation.js";
import { showError } from "../js/validationdetails.js";
// import { validateRegisteredEmailPassword } from "../js/signin.js";

const firestore = firebase.firestore();
const auth = firebase.auth();

let signedInUserID = "";

auth.onAuthStateChanged(authUser => {   
   if(authUser){
      showNavLinks();

      getUserName(authUser.uid);

      signedInUserID = authUser.uid;
   }else{
      hideNavLinks();
   }
});

export const getSignInUserID = () => {
   return signedInUserID;
}

export const createNewUser = async (userInputs) => {

   try {
      const result = await auth.createUserWithEmailAndPassword(userInputs.email, userInputs.password); 

      if (result.user) {
         const userDocumentRef = await firestore.collection("ProjectUsers").doc(result.user.uid).get();
   
         if (!userDocumentRef.exists) {
             await firestore.collection("ProjectUsers").doc(result.user.uid).set({ ...userInputs, userID: result.user.uid });

            window.location.href = "./search.html";
         }
      }
   }catch(error) {
      const errMessage = error.code;

      if(errMessage === "auth/email-already-in-use"){
         showError('email', '*'+ errMessage);
      }
   }

}

export const signUserIn = async (email, password) => {

   try{
      await auth.signInWithEmailAndPassword(email, password);

      window.location.href = "./search.html";
   }catch(error){
      const errMessage = error.code;

      if(errMessage == 'auth/wrong-password'){
         showError('password', '*'+errMessage);
         showError('email' , '*invalid email');
      }
   }

}

export const signUserOut = async () => {
   auth.signOut();

   window.location.href = "./index.html";

   hideSignOut();
}

const getUserName = async (userId) => {
   try{
      const result = await firestore.collection("ProjectUsers").doc(userId).get();
      const fName = result.data().firstname;
      const lName = result.data().lastname;

      displayUserName(fName , lName);
   }catch(error){
      document.querySelector('.signin-user-name').innerText = 'Loading...';
   }
}

function displayUserName(firstname, lastname){
   const userName = firstname + ' ' + lastname;

   document.querySelector('.signin-user-name').innerText = userName;

   document.querySelector('.signin-user-name').style.display = 'flex';
}