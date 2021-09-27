import { getSignInUserID } from "../firebase/firestore.js";
import { getRecipe, innerDetails } from "./imageInfo.js";
import { hideLoader, showLoader } from "./loader.js";
import { displayDetails, renderRecipes} from "./renderingrecipe.js";

const firestore = firebase.firestore();

showLoader();

document.querySelector(".favorites-link").addEventListener('click' , displayFavoriteRecipes);

function displayFavoriteRecipes(e){
   
   e.preventDefault();

   hideLoader();
   
   e.target.classList.add('show-my-favorites');

   if(e.target.classList.contains('show-my-favorites')){
      const favoritesSec = document.querySelector('.recipe-disp'); 
      let result = '';
      const userID = getSignInUserID();
      const recipes = [];

      firestore.collection("ProjectUsers").doc(userID).collection("favorites").onSnapshot(snapshot =>{
         snapshot.docs.forEach(doc => {
            recipes.push(doc.data());
         });

         result += renderRecipes(recipes);

         favoritesSec.innerHTML = result;

         favoritesSec.addEventListener('click' , (e) => {

            if(e.target.classList.contains('recipeImage') || e.target.classList.contains('infoItem') ){
               
               document.querySelector('.favorites-container').style.display = 'none';
               document.querySelector('.favorites-details-container').style.display = 'flex';
      
               const result = getRecipe(recipes, e);
      
               const favoriteRecipeDetails = document.querySelector('.favorites-details-container');
      
               favoriteRecipeDetails.innerHTML = displayDetails(result);
         
               innerDetails(result);
            }
      
         })
      })
   }
}

// function displayFavoriteRecipes(){
   // const favoritesSec = document.querySelector('.recipe-disp'); 
   // let result = '';
   // const userID = getSignInUserID();
   // const recipes = [];

   // firestore.collection("ProjectUsers").doc(userID).collection("favorites").onSnapshot(snapshot => {
   //    snapshot.docs.forEach(doc => {
   //       recipes.push(doc.data());
   //    });

   //    result += renderRecipes(recipes);

   //    favoritesSec.innerHTML = result;

   //    favoritesSec.addEventListener('click' , (e) => {

   //       if(e.target.classList.contains('recipeImage') || e.target.classList.contains('infoItem') ){
            
   //          document.querySelector('.favorites-container').style.display = 'none';
   //          document.querySelector('.favorites-details-container').style.display = 'flex';
   
   //          const result = getRecipe(recipes, e);
   
   //          const favoriteRecipeDetails = document.querySelector('.favorites-details-container');
   
   //          favoriteRecipeDetails.innerHTML = displayDetails(result);
      
   //          innerDetails(result);
   //       }
   
   //    })
   // })

// }
  