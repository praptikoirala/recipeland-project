import { Recipes } from "./recipes.js";
import { showError } from "./errorMsg.js";

//Search-section
const userInput = document.querySelector('.user-inp');
const goBtn = document.querySelector('.search-btn');

const recipe = new Recipes;
const displaySec = document.querySelector('.recipe-disp');

goBtn.addEventListener('click' , () => {
   const query = userInput.value;

   if(query){

      recipe.displayResult(query, 0, 12)
         .then(data => {
            document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>Search results for '${query}':</h1>`
            displaySec.innerHTML = renderRecipes(data);
         });

         userInput.value = '';

   }else{
      showError();
   }

   //Load initial contents
   function renderRecipes(recipeInfo){
      let output = '';
      
      for(let i = 0; i < recipeInfo.hits.length; i++){
         const info = recipeInfo.hits[i].recipe;
         let mealtype, cuisinetype;

         if(!info.mealType){
            mealtype = 'NotAvailable';
         }else{
            mealtype = info.mealType;
         }

         if(info.cuisineType == undefined){
            cuisinetype = 'NotAvailable';
         }else{
            cuisinetype = info.cuisineType;
         }

          output += `
            <div class='content'>
               <div class='recipe-img'>
                  <img src='${info.image}'>
               </div>
               <div class='recipe-info'>
                  <p>Dish: ${info.label}</p>
                  <p>MealType: ${mealtype}</p>
                  <p>CuisineType: ${cuisinetype}</p>
               </div>
            </div>
          `  
      }

      loadMore(recipeInfo);

      return output;
   }

   //Load_More Contents
   function loadMore(moreItems){
      const userInp = userInput.value;

      if(moreItems.more == true){
         document.querySelector('.loadBtn').style.display = 'block';
      }else{

         document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>No more results for '${userInp}'...</h1>`

         document.querySelector('.loadBtn').style.display = 'none';
      }
      
      document.querySelector('.loadBtn').addEventListener('click' , () => {

         recipe.displayResult(userInp, moreItems.to + 1, moreItems.to + 10)
            .then(data => {
               displaySec.innerHTML = renderRecipes(data);
            });
      })
   }

});


