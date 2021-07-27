//Hamburger-Menu
const hamburger = document.querySelector('.sidemenu');
const menu = document.querySelector('.menu-items');
const line =document.querySelector('.line');
const cross =document.querySelector('.cross');


hamburger.addEventListener('click',displayMenu);

function displayMenu(){

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

//Display search result
const userInput = document.querySelector('.user-inp');
const goBtn = document.querySelector('.search-btn');

const recipe = new Recipes;
const displaySec = document.querySelector('.recipe-disp');

goBtn.addEventListener('click' , () => {
   const query = userInput.value;

   if(query){
      userInput.value = '';

      document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>Results:</h1>`

      recipe.displayResult(query)
         .then(data => {
            displaySec.innerHTML = renderRecipes(data);
         });
   }else{
      console.log('Nothing to search');
   }

   function renderRecipes(recipeInfo){
      let output = '';
      
      for(let i = 0; i < recipeInfo.hits.length; i++){
         const info = recipeInfo.hits[i].recipe;

         if(info.mealType == undefined){
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
      return output;

   }
});