import { showError, checkLength, checkMatch, validateEmail } from "./validationdetails.js";

export function validateUserInput(firstname, lastname, email, password, repassword){
   const userFirstName = firstname;
   const userLastName = lastname;
   const userEmail = email;
   const userPassword = password;
   const userRePassword = repassword;

   if(userFirstName == ''){
      showError('fname' , '*first name cannot be empty');
   }else{
      checkLength(userFirstName , '3', '15', 'fname', 'first name');
   }

   if(userLastName == ''){
      showError('lname' , '*last name cannot be empty');
   }else{
      checkLength(userLastName , '3', '15', 'lname', 'last name');
   }

   if(userEmail == ''){
      showError('email' , '*email cannot be empty');
   }else{
      validateEmail(userEmail);
   }

   if(userPassword == ''){
      showError('password' , '*password cannot be empty');
   }else{
      checkLength(userPassword , '6', '15', 'password', 'password');
   }

   if(userRePassword == ''){
      showError('repassword' , '*password cannot be empty');
   }else{
      checkLength(userRePassword , '6', '15', 'repassword', 'password');
      checkMatch(userPassword, userRePassword, 'repassword');
   }
}

export function validateRegisteredInput(email, password){

   if(email == ''){
      showError('email', '*email cannot be empty');
   }else{
      validateEmail(email);
   }

   if(password == ''){
      showError('password', '*password cannot be empty');
   }
}