import { Recipes } from "./recipes.js";
import { renderRecipes, detailedInfo } from "./renderingrecipe.js";

const recipe = new Recipes;
const displaySec = document.querySelector('.recipe-disp');

export function loadMore(moreRecipes, userQuery){
   const food = userQuery;
   const result = moreRecipes;

   // console.log(food, result);

   document.querySelector('.loadBtn').style.display = 'block';

   if(!result.more){
      document.querySelector('.loadBtn').style.display = 'none';

      document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>No results for '${food}'...</h1>`;
   }
   
   document.querySelector('.loadBtn').addEventListener('click' , () => {  

      recipe.displayResult(food, result.to + 1, result.to + 10)
         .then( (data) => {

            result.to = data.to;

            const recipe = data.hits.map( hit => hit.recipe);

            displaySec.innerHTML = renderRecipes(recipe);
            
            detailedInfo(data);
         });

   });
}