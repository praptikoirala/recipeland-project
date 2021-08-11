import { createNewUser } from "../firebase/firestore.js";

document.querySelector('.signup-btn').addEventListener('click' , (e) => {

   e.preventDefault();

   const inputFirstName =  document.querySelector('.user-firstname').value; 
   const inputLastName =  document.querySelector('.user-lastname').value; 
   const inputEmail = document.querySelector('.user-email').value;
   const inputPassword = document.querySelector('.user-password').value;

   createNewUser({firstname : inputFirstName,lastname : inputLastName, email : inputEmail,password : inputPassword});
})