import { signUserIn, signUserOut  } from "../firebase/firestore.js";

document.querySelector('.signin-form').addEventListener('submit' , (e) => {

   e.preventDefault();

   const userEmail = document.querySelector('.user-email').value;
   const userPassword = document.querySelector('.user-password').value;

   signUserIn(userEmail, userPassword);
})



