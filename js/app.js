import { Recipes } from "./recipes.js";
import { showError } from "./errorMsg.js";

//Search-section
const userInput = document.querySelector('.user-inp');
const form = document.querySelector('.form-sec');
const displaySec = document.querySelector('.recipe-disp');
const foodName = userInput.value;

const recipe = new Recipes;

form.addEventListener('submit' , (e) => {

   e.preventDefault();

   const query = userInput.value;

   document.querySelector('.heading-div').innerHTML = '';
   document.querySelector('.loadBtn').style.display = 'none';
   displaySec.innerHTML = '';


   if(query){
      userInput.value = '';

      recipe.displayResult(query, 0, 12)
         .then(data => {

            document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>Search results for '${query}':</h1>`;

            displaySec.innerHTML = renderRecipes(data);
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
            <div class='content'>
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
   
   function loadMore(moreItems){
      // console.log(document.querySelector('.recipe-img'));

      if(moreItems.more == true){

         document.querySelector('.loadBtn').style.display = 'block';

      }else{
         
         document.querySelector('.loadBtn').style.display = 'none';
   
         document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>No more results for '${query}'...</h1>`;
         
      }
      
      document.querySelector('.loadBtn').addEventListener('click' , () => {
   
         recipe.displayResult(query, moreItems.to + 1, moreItems.to + 10)
            .then(data => {
               displaySec.innerHTML = renderRecipes(data);
            });
      })
   }
});

//main data
document.querySelector('.recipe-disp').addEventListener('click' , (e) => {

      // if(e.target.classList.conatins('recipeImage')){
      //    console.log('doing good....');
      // }
      if(e.target.classList.contains('recipeImage') || e.target.classList.contains('infoItem') ){

         document.querySelector('.input-sec').innerHTML = '';
         document.querySelector('.heading-div').innerHTML = '';
         document.querySelector('.recipe-disp').innerHTML = '';
         document.querySelector('.load-btn').innerHTML = '';

         document.querySelector('.search-container').innerHTML = `
            <h1>${foodName}</h1>
         `;
      }
   
});
