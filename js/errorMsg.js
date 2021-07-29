const errorMsg = document.querySelector('.error-msg');
// const headingSec = document.querySelector('.heading-div');
// const recipeSec = document.querySelector('.recipe-disp');
// const loadBtn = document.querySelector('.loadBtn');

export function showError(){
  errorMsg.style.display = 'block';

  // headingSec.innerHTML = '';
  // recipeSec.innerHTML = '';
  // loadBtn.style.display = 'none';

   setTimeout( () => {
     errorMsg.style.display = 'none';
   } , 1000);

}