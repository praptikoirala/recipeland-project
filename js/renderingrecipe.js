import { renderFavoritesButton, getRecipe, innerDetails } from "./imageInfo.js";

export function renderRecipes(recipe){

   let output = '';
   
   for(let i = 0; i < recipe.length; i++){
      const info = recipe[i];
      let mealtype, cuisinetype;

      if(!info.mealType){
         mealtype = 'Not Available';
      }else{
         mealtype = info.mealType;
      }

      if(!info.cuisineType){
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
   return output;
}

export function detailedInfo(info){
   document.querySelector('.recipe-disp').addEventListener('click' , (e) => {

      if(e.target.classList.contains('recipeImage') || e.target.classList.contains('infoItem') ){

         document.querySelector('.search-container').style.display = 'none';
         document.querySelector('.details-container').style.display = 'flex';

         const recipe = getRecipe(info.hits.map(hit => hit.recipe), e);

         const recipeDetailsSection = document.querySelector('.user-details-container');

         recipeDetailsSection.innerHTML = displayDetails(recipe);

         innerDetails(recipe);
      }

   });
}

export function displayDetails(recipe){

   let output = '', cautions, dietLabel, ingredient = '',mealType ,cuisineType ,i ;

   if(!recipe.cautions[0] || recipe.cautions[0] === 'FODMAP'){
      cautions = 'Not Available';
   }else{
      cautions = recipe.cautions[0];
   }

   if(!recipe.dietLabels[0]){
      dietLabel = 'Not Available';
   }else{
      dietLabel = recipe.dietLabels;
   }

   if(!recipe.mealType){
      mealType = 'Not Available';
   }else{
      mealType = recipe.mealType;
   }

   if(!recipe.cuisineType){
      cuisineType = 'Not Available';
   }else{
      cuisineType = recipe.cuisineType;
   }

   for(i = 0; i < recipe.ingredientLines.length; i++){ 
      ingredient += ` <li class='ingredients-tag'>${recipe.ingredientLines[i]}</li> `;
   }

   renderFavoritesButton(recipe.uri).then(data => {
      document.querySelector('.buttons').innerHTML = data;
   });

   output += `
      <div class='details'> 
         <div class="block-error-msg">
              
         </div>
         <div class='heading'>
            <a class='back'><i class="fas fa-arrow-left"></i></a>
            <h1 class='info-head'>${recipe.label}</h1>
         </div>

         <div class='recipe-ingredients'>
            <div class='image-sec'>
               <img src='${recipe.image}' class='details-img'/>
               <div class="buttons">

               </div>
            </div>
            <div class='ingredients-sec'>
               <div>
                  <h1 class='inner-heading'>Ingredients:</h1>
                  <ul class='ingredients'>${ingredient}</ul>
               </div>
               <div class='full-recipe'>
                  <p class='link-guide'>For full recipe:</p>
                  <a href='${recipe.url}' target='_blank' class='recipe-link'>View Recipe</a>
               </div>
            </div>
         </div>

         <div class='add-info'>
            <h1 class='inner-heading'>Health Labels:</h1>
            <ul class='infos'>
               <li>Cuisine Type:</li>
               <li class='tags'>${cuisineType}</li>
               <li>Meal Type:</li>
               <li class='tags'>${mealType}</li>
               <li>Diet Label:</li>
               <li class='tags'>${dietLabel}</li>
               <li>Cautions : </li>
               <li class='tags'>${cautions}</li>
               <li>Calories:</li>
               <li class='tags'>${recipe.calories}</li>
            </ul>
            <button class='view-more'>View More</button>
         </div>  
      </div> 
   `;

   return output;

}

