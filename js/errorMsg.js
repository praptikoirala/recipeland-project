export function showError(errMessage){

  const errorMsgContainer = document.querySelector('.block-error-msg');

  errorMsgContainer.style.display = 'block';

  errorMsgContainer.innerText = errMessage;

   setTimeout( () => {
     errorMsgContainer.style.display = 'none';
   } , 2000);

}