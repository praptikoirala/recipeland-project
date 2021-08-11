import { hideNavLinks, showNavLinks , showSignOut , hideSignOut } from "../js/navigation.js";

const firestore = firebase.firestore();
const auth = firebase.auth();

let signedInUserID = "";

auth.onAuthStateChanged(authUser => {
   console.log(authUser);
   
   if(authUser){
      showNavLinks();

      getUserName(authUser.uid);

      // async function showUserName(){
      //    const result = await firestore.collection('ProjectUsers').doc(authUser.uid).get();

      //    console.log(result.data());
      // }

      signedInUserID = authUser.uid;
   }else{
      hideNavLinks();
   }
});

export const getSignInUserID = () => {
   return signedInUserID;
}

export const createNewUser = async (userInputs) => {
   const result = await auth.createUserWithEmailAndPassword(userInputs.email, userInputs.password); 
   
   console.log(result);

   if (result.user) {
      const userDocumentExists = await firestore.collection("ProjectUsers").doc(result.user.uid).get();

      if (!userDocumentExists.exists) {
          await firestore.collection("ProjectUsers").doc(result.user.uid).set({ ...userInputs, userID: result.user.uid });
      }
   }

   window.location.href = "./search.html";
}

export const signUserIn = async (email, password) => {

   const inputs = await auth.signInWithEmailAndPassword(email, password);

   window.location.href = "./search.html";

   console.log(inputs);
}

export const signUserOut = async () => {

   auth.signOut();

   window.location.href = "./index.html";

   hideSignOut();
}

const getUserName = async (userId) => {
   console.log(userId);

   const result = await firestore.collection("ProjectUsers").doc(userId).get();

   const fName = result.data().firstname;
   const lName = result.data().lastname;

   displayUserName(fName , lName);
}

function displayUserName(firstname, lastname){

   document.querySelector('.signin-user-name').innerHTML = `
      <p class="user-title">User</p>
      <p>${firstname + ' ' + lastname}</p>
   `;

   document.querySelector('.user-name').style.display = 'flex';
}