// import { Recipes } from "./recipes ";

//Hamburger-Menu
const hamburger = document.querySelector('.sidemenu');
const menu = document.querySelector('.menu-items');
const line =document.querySelector('.line');
const cross =document.querySelector('.cross');


hamburger.addEventListener('click',displayMenu);

function displayMenu() {

   if(menu.classList.contains('show-menu')){
      menu.classList.remove('show-menu')
   }else{
      menu.classList.add('show-menu');
   }

   if(line.classList.contains('remove-line')){
      line.classList.remove('remove-line');
   }else{
      line.classList.add('remove-line');
   }

   if(cross.classList.contains('show-cross')){
      cross.classList.remove('show-cross');
   }else{
      cross.classList.add('show-cross');
   }
}

//Search-section
const userInput = document.querySelector('.user-inp');
const goBtn = document.querySelector('.search-btn');

const recipe = new Recipes;
const displaySec = document.querySelector('.recipe-disp');

goBtn.addEventListener('click' , () => {
   const query = userInput.value;

   if(query){

      document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>Search results for '${query}' are:</h1>`

      recipe.displayResult(query, 0, 12)
         .then(data => {
            displaySec.innerHTML = renderRecipes(data);
         });

   }else{
      console.log('Nothing to search');
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
         console.log(moreItems.more);

         document.querySelector('.loadBtn').style.display = 'block';
      }else{

         document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>No more results for '${query}'...</h1>`

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


