import { Recipes } from "./recipes.js";
import { renderRecipes } from "./renderingrecipe.js";

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
      
      // let from = data.to + 1,
      //     to = data.to + 11;


      recipe.displayResult(food, result.to + 1, result.to + 11)
         .then( (data) => {

            console.log(data);

            result.to = data.to;

            console.log(displaySec);

            displaySec.innerHTML = renderRecipes(data.hits.map( hit => hit.recipe));
         });

   });
}