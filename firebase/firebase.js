// const firestore = firebase.firestore();

// firestore.collection("users").onSnapshot(snapshot => {
//    console.log("the database has been changed");
// })

// const addUser = async (user) => {
//    await firestore.collection("users").doc(user.id).set(user);
//    console.log("user inserted successfully");
// }

// const getUser = async (userID) => {
//    const user = await firestore.collection("users").doc(userID).get();
//    console.log(user);
// }

// const updateUser = async (userID) => {
//    await firestore.collection("users").doc(userID).update({ name: "prapti bhandari" });
//    console.log("user updated successfully");
// }

// const deleteUser = async(userId) => {
//    await firestore.collection('users').doc(userId).delete();
//    console.log('user deleted');
// }

// const getUsers = async () => {
//    const users = await firestore.collection("users").get();
//    console.log(users);

//    const userDocuments = users.docs;

//    userDocuments.forEach(user => {
//       console.log(user.data());
//    });
// }

// document.addEventListener("click", () => {
//    // addUser({ id: "123abc345", name: "prapti koirala", address: "airport" });
//    // addUser({ id: "234bcd456", name: "pratik bhandari", address: "tikathali" });
//    // addUser({ id: "345cde567", name: "aakriti thapa", address: "baneshwor" });
//    addUser({ id: "456def678", name: "richa gurung", address: "pokhara" });
//    // getUser("123abc345");
//    // updateUser('123abc345');
//    // deleteUser('456def678');
// });

// const firestore = firebase.firestore();

// const addAccount = async (account) => {
//    await firestore.collection("Accounts").doc(account.id).set(account);
//    console.log('account added');
// };

// const getAccount = async (accountId) => {
//    const account = await firestore.collection("Accounts").doc(accountId).get();
//    console.log(account.data());
// };

// const updateAccount = async(accountId) => {
//    await firestore.collection("Accounts").doc(accountId).update({password: "hello123"});
//    console.log('update successful');
// };

// const deleteAccount = async (accountId) => {
//    await firestore.collection("Accounts").doc(accountId).delete();
//    console.log('delete successful');
// };

// const getAccounts = async () => {
//    const account = await firestore.collection("Accounts").get();
//    // console.log(accounts);

//    const accountDocuments = account.docs;

//    accountDocuments.forEach(accounts => {
//       console.log(accounts.data());
//    });
// }

import { showNavLinks , hideNavLinks } from "../js/navigation.js";

const auth = firebase.auth();
// const firestore = firebase.firestore();

auth.onAuthStateChanged(authUser => {
   console.log(authUser);

   if(authUser){
      showNavLinks();
      window.location.href = "/search.html";
   }else{
      hideNavLinks();
   }
})

   export const createNewUser = async (userInfo) => {
   const result =  await auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);

   console.log(result);
}

   if (result.user) {
      const userDocumentRef = await firestore.collection("users").doc(result.user.uid).get();

      if (!userDocumentRef.exists) {
          await firestore.collection("users").doc(result.user.uid).set({ ...userInfo, userID: result.user.uid });
          console.log("user added successfully");
      }
   }

   // console.log("user successfully created");

export const signUserIn = async (email, password) => {
   const user = await auth.signInWithEmailAndPassword(email, password);
   console.log(user);

   // const userData = await firestore.collection('users').doc(user.user.uid).get();
   // console.log(userData.data().email);
}

document.addEventListener('click' , () => {
   // createNewUser({email: "praptikoirala6@gmail.com" ,password: 'hello123', username: 'praptiiii'  });
   auth.signOut();
   // signUserIn("praptikoirala6@gmail.com", "hello123");

});