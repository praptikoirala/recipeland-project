export function showError(errorSec , errorMsg){
   document.querySelector(`.${errorSec}-error-msg`).style.display = 'inline-block';
   document.querySelector(`.${errorSec}-error-msg`).innerHTML = errorMsg;

   setTimeout(function hideError(){
      document.querySelector(`.${errorSec}-error-msg`).style.display = 'none';
   }, 5000);
}

export function checkLength(userInput ,min ,max, errorSec, inputType){

   if(userInput.length < min){
      document.querySelector(`.${errorSec}-error-msg`).style.display = 'inline-block';
      document.querySelector(`.${errorSec}-error-msg`).innerHTML = `
         *${inputType} must be greater than ${min} characters
      `;
   }else if(userInput.length > max){
      document.querySelector(`.${errorSec}-error-msg`).style.display = 'inline-block';

      document.querySelector(`.${errorSec}-error-msg`).innerHTML = `
         *${inputType} must be less than ${max} characters
      `;
   }

   setTimeout(function hideError(){
      document.querySelector(`.${errorSec}-error-msg`).style.display = 'none';
   }, 5000);
}

export function checkMatch(secondPass, firstPass, errorSec){
   if(secondPass !== firstPass){
      document.querySelector(`.${errorSec}-error-msg`).style.display = 'inline-block';

      document.querySelector(`.${errorSec}-error-msg`).innerHTML = '*password does not match';
   }

   setTimeout(function hideError(){
      document.querySelector(`.${errorSec}-error-msg`).style.display = 'none';
   }, 5000);
}

export function validateEmail(email){
      
   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   const validationStatus = re.test(String(email).toLowerCase());

   if(!validationStatus){
      showError('email', '*invalid email');
   }
}