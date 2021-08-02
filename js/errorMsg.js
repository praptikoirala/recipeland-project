const errorMsg = document.querySelector('.error-msg');

export function showError(){
  errorMsg.style.display = 'block';

   setTimeout( () => {
     errorMsg.style.display = 'none';
   } , 2000);

}