import { getSignInUserID } from "../firebase/firestore.js";
import { detailedInfo } from "./renderingrecipe.js";

const firestore = firebase.firestore();

export async function addToFavorites(recipe, e){

   const signInUserId = getSignInUserID();
   
   await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").add(recipe); 
   
   await renderFavoritesButton(recipe.uri);
}

export function getRecipe(recipes, e) {
   const contentID = e.target.parentNode.parentNode.id;

   const recipe = recipes.find(recipeInner => recipeInner.uri === contentID);

   return recipe;
}

export async function renderFavoritesButton(uri) {
   let button = "";

   const firestore = firebase.firestore();
   const signInUserId = getSignInUserID();

   const result = await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").where("uri", "==", uri).get();

   if (result.docs.length > 0) {
      button += `<button class='favorites remove-to-favorites'>Remove from favorites</button>`;
      document.querySelector('.buttons').innerHTML = button;
   } else {
      button += `<button class='favorites add-from-favorites'>Add to favorites</button>`;
      document.querySelector('.buttons').innerHTML = button;
   }

   return button;
}

export function innerDetails(recipe){

   document.querySelector('.buttons').addEventListener('click' , (e) => {
      addToFavorites(recipe, e);
   });

   document.querySelector('.back').addEventListener('click' , () => {
      document.querySelector('.search-container').style.display = 'flex';
      document.querySelector('.details-container').style.display = 'none';
   });

   document.querySelector('.view-more').addEventListener('click' , (e) => {
      document.querySelector('.view-more').style.display = 'none';

      let digest = '', healthLabel = '';

      for(let i = 0; i < 10; i++){
         healthLabel += `
            <li class='tags arr-tags'>${recipe.healthLabels[i]}</li>
         `
      }

      for(let i = 0; i < 10; i++){
         digest += `
            <li class='tags arr-tags'>${recipe.digest[i].label}: ${recipe.digest[i].total}${recipe.digest[i].unit}</li>
         `;
      }
      
      document.querySelector('.infos').innerHTML += `
         <li>Health Labels:</li>
         <ul class='array-item'>${healthLabel}</ul>
         <li>Nutrients:</li>
         <ul class='array-item'>${digest}</ul>
      `;
   });
}

