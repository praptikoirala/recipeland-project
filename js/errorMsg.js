export function showError(errMessage){
  const errorMsgContainer = document.querySelector('.alert-msg');

  errorMsgContainer.classList.add('show-alert');

  errorMsgContainer.innerHTML = errMessage;

  setTimeout( () => {
    errorMsgContainer.classList.remove('show-alert');
  } , 2000);

}