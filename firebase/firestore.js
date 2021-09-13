import { hideNavLinks, showNavLinks , hideSignOut } from "../js/navigation.js";
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
   const result = await auth.createUserWithEmailAndPassword(userInputs.email, userInputs.password); 
   
   // console.log(result);

   if (result.user) {
      const userDocumentRef = await firestore.collection("ProjectUsers").doc(result.user.uid).get();

      if (!userDocumentRef.exists) {
          await firestore.collection("ProjectUsers").doc(result.user.uid).set({ ...userInputs, userID: result.user.uid });

         //  getRegisteredEmailPassword(result.user.uid);
         window.location.href = "./search.html";
      }
   }

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
   const result = await firestore.collection("ProjectUsers").doc(userId).get();

   const fName = result.data().firstname;
   const lName = result.data().lastname;

   displayUserName(fName , lName);
}

function displayUserName(firstname, lastname){
   const userName = firstname + ' ' + lastname;

   document.querySelector('.signin-user-name').innerText = userName;

   document.querySelector('.signin-user-name').style.display = 'flex';
}

// async function getRegisteredEmailPassword(userId){
//    const result = await firestore.collection("ProjectUsers").doc(userId).get();

//    const email = result.data().email;
//    const password = result.data().password;

//    validateRegisteredEmailPassword(email, password);
// }