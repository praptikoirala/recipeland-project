import { getSignInUserID } from "../firebase/firestore.js";
import { showError } from "./errorMsg.js";

const firestore = firebase.firestore();

async function addToFavorites(recipe){

   const signInUserId = getSignInUserID();

   try {
      await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").add(recipe);

      renderFavoritesButton(recipe.uri).then(data => {
         document.querySelector('.buttons').innerHTML = data;
      });

      showError('Added to favorites');
   } catch (error) {
      // document.querySelector('.favorites').innerText = 'Something went wrong';
   }  
}

async function removeFromFavorites(recipe){

   const signInUserId = getSignInUserID();

   // const result = await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").where("uri", "==" , recipe.uri).get();

   // console.log(result.data());

   try {
      const recipesRef = await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").where("uri", "==", recipe.uri).get();

      await recipesRef.docs[0].ref.delete();

      renderFavoritesButton(recipe.uri).then(data => {
         document.querySelector('.buttons').innerHTML = data;
      });

      showError('Removed from favorites');
   } catch (error) {
      console.log(error);
      document.querySelector('.favorites').innerText = 'Something went wrong';
   }  
}

export function getRecipe(recipes, e) {
   const contentID = e.target.parentNode.parentNode.id;

   const recipe = recipes.find(recipeInner => recipeInner.uri === contentID);

   return recipe;
}

export async function renderFavoritesButton(uri){
   

   let button = '';

   const firestore = firebase.firestore();
   const signInUserId = getSignInUserID();

   try{
      const result = await firestore.collection("ProjectUsers").doc(signInUserId).collection("favorites").where("uri", "==", uri).get();

      if (result.docs.length > 0) {
         button += `<button class='favorites remove-from-favorites'>Remove from favorites</button>`;
      }
      else{
         button += `<button class='favorites add-to-favorites'>Add to favorites</button>`;
      }
   }catch(error){
      button += `<button class='favorites'>Failed to load...</button>`;
   }

   return button;
}

export function innerDetails(recipe){

   document.querySelector('.buttons').addEventListener('click' , (e) => {
      if(e.target.classList.contains('add-to-favorites')){
         addToFavorites(recipe);
      }

      if(e.target.classList.contains('remove-from-favorites')){
         removeFromFavorites(recipe);
      }
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

