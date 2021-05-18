const hamburger = document.querySelector('.sidemenu');
const lines = document.querySelectorAll('.line');
const menu = document.querySelector('.menu-items');
const menuItem = document.querySelectorAll('.menuitem');

hamburger.addEventListener('click',displayMenu);

function displayMenu(){

   if(menu.classList.contains('show-menu')){
      menu.classList.remove('show-menu')
   }else{
      menu.classList.add('show-menu');
   }

   console.log(menu);
}