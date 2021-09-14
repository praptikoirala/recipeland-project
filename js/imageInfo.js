import { getSignInUserID } from "../firebase/firestore.js";
import { showError } from "./errorMsg.js";

const firestore = firebase.firestore();

export async function addToFavorites(recipe){
   console.log('hello');

   const signInUserId = getSignInUserID();

   try {
      await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").add(recipe); 

      renderFavoritesButton(recipe.uri).then(data => {
         document.querySelector('.buttons').innerHTML = data;
      });
   } catch (error) {
      // document.querySelector('.favorites').innerText = 'Something went wrong';
   }  
}

export function getRecipe(recipes, e) {
   const contentID = e.target.parentNode.parentNode.id;

   const recipe = recipes.find(recipeInner => recipeInner.uri === contentID);

   return recipe;
}

export async function renderFavoritesButton(uri) {
   let button = '' ;

   // button += `<button class='favorites loading-favorites-button' disabled>Loading...</button>`;

   const firestore = firebase.firestore();
   const signInUserId = getSignInUserID();

   const result = await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").where("uri", "==", uri).get();

      if (result.docs.length > 0) {
         button += `<button class='favorites remove-from-favorites'>Remove from favorites</button>`;
      }
      else{
         button += `<button class='favorites add-to-favorites'>Add to favorites</button>`;
      }
   return button;
}

export function innerDetails(recipe){

   document.querySelector('.buttons').addEventListener('click' , () => {
      addToFavorites(recipe);
      showError("Added to favorites");
   });

   document.querySelector('.back').addEventListener('click' , () => {
      document.querySelector('.recipes-container').style.display = 'flex';
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

