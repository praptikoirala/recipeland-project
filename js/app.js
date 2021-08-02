import { Recipes } from "./recipes.js";
import { showError } from "./errorMsg.js";
import { detailedInfo } from "./imageInfo.js";

//Search-section
const userInput = document.querySelector('.user-inp');
const form = document.querySelector('.form-sec');
const displaySec = document.querySelector('.recipe-disp');
const foodName = userInput.value;

const recipe = new Recipes;

form.addEventListener('submit' , (e) => {

   e.preventDefault();

   const query = userInput.value;

   if(query){
      userInput.value = '';

      document.querySelector('.heading-div').innerHTML = '';
      document.querySelector('.loadBtn').style.display = 'none';
      displaySec.innerHTML = '';

      recipe.displayResult(query, 2, 14)
         .then(data => {

            document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>Search results for '${query}':</h1>`;

            displaySec.innerHTML = renderRecipes(data);
            detailedInfo( data );

         });

   }else{
      showError();
   }

   function renderRecipes(recipeInfo){

      let output = '';
      
      for(let i = 0; i < recipeInfo.hits.length; i++){
         const info = recipeInfo.hits[i].recipe;
         let mealtype, cuisinetype;
   
         if(!info.mealType){
            mealtype = 'Not Available';
         }else{
            mealtype = info.mealType;
         }
   
         if(info.cuisineType == undefined){
            cuisinetype = 'Not Available';
         }else{
            cuisinetype = info.cuisineType;
         }
   
          output += `
            <div class='content' id = ${info.uri}>
               <div class='recipe-img'>
                  <img src='${info.image}' class='recipeImage'>
               </div>
               <div class='recipe-info'>
                  <p class='infoItem'>Dish: ${info.label}</p>
                  <p class='infoItem'>MealType: ${mealtype}</p>
                  <p class='infoItem'>CuisineType: ${cuisinetype}</p>
               </div>
            </div>
          `  
      }

      loadMore(recipeInfo);
  
      return output;
   }
   
   function loadMore(moreRecipes){
      const food = query;

      document.querySelector('.loadBtn').style.display = 'block';

      if(!moreRecipes.more){
         document.querySelector('.loadBtn').style.display = 'none';

         document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>No results for '${food}'...</h1>`;
      }
      
      document.querySelector('.loadBtn').addEventListener('click' , () => {

         console.log(moreRecipes.more);
         console.log(food);
         console.log(moreRecipes.to);

         recipe.displayResult(food, moreRecipes.to + 1, moreRecipes.to + 10)
            .then(data => {
               displaySec.innerHTML = renderRecipes(data);
            });

      });
 
   }
   
});

