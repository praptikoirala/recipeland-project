const hamburger = document.querySelector('.sidemenu');

hamburger.addEventListener('click',displayMenu);

function displayMenu() {
   const menu = document.querySelector('.menu-items');
   const line =document.querySelector('.line');
   const cross =document.querySelector('.cross');

   menu.classList.toggle('show-menu');

   line.classList.toggle('remove-line');

   cross.classList.toggle('show-cross');
}