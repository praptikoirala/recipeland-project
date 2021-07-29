const hamburger = document.querySelector('.sidemenu');

hamburger.addEventListener('click',displayMenu);

function displayMenu() {
   const menu = document.querySelector('.menu-items');
   const line =document.querySelector('.line');
   const cross =document.querySelector('.cross');

   menu.classList.toggle('show-menu');

   line.classList.toggle('remove-line');

   cross.classList.toggle('show-cross');

   // if(menu.classList.contains('show-menu')){
   //    menu.classList.remove('show-menu')
   // }else{
   //    menu.classList.add('show-menu');
   // }

   // if(line.classList.contains('remove-line')){
   //    line.classList.remove('remove-line');
   // }else{
   //    line.classList.add('remove-line');
   // }

   // if(cross.classList.contains('show-cross')){
   //    cross.classList.remove('show-cross');
   // }else{
   //    cross.classList.add('show-cross');
   // }
}