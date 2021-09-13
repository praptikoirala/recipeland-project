import { Recipes } from "./recipes.js";
import { showError } from "./errorMsg.js";
import { detailedInfo } from "./renderingrecipe.js";
import { renderRecipes } from "./renderingrecipe.js";
import { loadMore } from "./morerecipes.js";

//Search-section
const userInput = document.querySelector('.user-inp');
const form = document.querySelector('.form-sec');
const displaySec = document.querySelector('.recipe-disp');
const recipeDetailsSec = document.querySelector('.details-container');

const recipe = new Recipes;

form.addEventListener('submit' , (e) => {

   e.preventDefault();

   const query = userInput.value;

   document.querySelector('.details-container').style.display = 'none';

   if(query){
      document.querySelector('.heading-div').innerHTML = '';
      document.querySelector('.loadBtn').style.display = 'none';
      displaySec.innerHTML = '';
      userInput.value = '';

      recipe.displayResult(query, 2, 14)
         .then(data => {
            const recipes = data.hits.map(hit => hit.recipe);

            document.querySelector('.heading-div').innerHTML = `<h1 class='result-head'>Search results for '${query}':</h1>`;

            displaySec.innerHTML = renderRecipes(recipes);

            detailedInfo(data);

            loadMore(data, query);


         });

   }else{
      showError();
   }

});

