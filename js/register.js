import { createNewUser } from "../firebase/firestore.js";
import { validateUserInput } from '../js/validation.js';

document.querySelector('.signup-form').addEventListener('submit' , (e) => {
   e.preventDefault();

   const inputFirstName =  document.querySelector('.user-firstname').value; 
   const inputLastName =  document.querySelector('.user-lastname').value; 
   const inputEmail = document.querySelector('.user-email').value;
   const inputPassword = document.querySelector('.user-password').value;
   const inputRePassword = document.querySelector('.user-re-password').value;

   try{
      validateUserInput(inputFirstName, inputLastName,inputEmail, inputPassword, inputRePassword);

      createNewUser({firstname : inputFirstName, lastname : inputLastName, email : inputEmail,password : inputPassword});
   }catch(error){
      console.log(error);
   }
})