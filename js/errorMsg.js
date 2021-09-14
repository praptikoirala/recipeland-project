const errorMsg = document.querySelector('.block-error-msg');

export function showError(errMessage){
  errorMsg.innerText = errMessage;
  errorMsg.style.display = 'block';

   setTimeout( () => {
     errorMsg.style.display = 'none';
   } , 2000);

}