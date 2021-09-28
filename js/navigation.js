import { signUserOut } from "../firebase/firestore.js";

export function showNavLinks(){
   document.querySelector('.search-link').style.display = 'inline-block';
   document.querySelector('.favorites-link').style.display = 'inline-block';
   document.querySelector('.register-link').style.display = 'none';
   showSignOut();
}

export function hideNavLinks(){
   document.querySelector('.search-link').style.display = 'none';
   document.querySelector('.favorites-link').style.display = 'none';
   document.querySelector('.register-link').style.display = 'inline';
   document.querySelector('.home-signin-button').style.display = 'grid';
}

export function showSignOut(){
   document.querySelector('.sign-out').style.display = 'inline-block';
}

export function hideSignOut(){
   document.querySelector('.sign-out').style.display = 'none';
}

document.querySelector('.sign-out').addEventListener('click' , () => {
   signUserOut();
})
