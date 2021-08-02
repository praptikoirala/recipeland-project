export function detailedInfo(info){

   document.querySelector('.recipe-disp').addEventListener('click' , (e) => {

      if(e.target.classList.contains('recipeImage') || e.target.classList.contains('infoItem') ){
         document.querySelector('.input-sec').innerHTML = '';
         document.querySelector('.heading-div').innerHTML = '';
         document.querySelector('.recipe-disp').innerHTML = '';
         document.querySelector('.load-btn').innerHTML = '';

         const contentID = e.target.parentNode.parentNode.id;

         const recipe = info.hits.find(hit => hit.recipe.uri === contentID);

         displayDetails(recipe.recipe);
      }

      function displayDetails(arrInfo){

   
         let cautions, dietLabel, ingredient = '',healthLabel = '', i;

         if(!arrInfo.cautions[0] || arrInfo.cautions[0] === 'FODMAP'){
            cautions = 'Not Available';
         }else{
            cautions = arrInfo.cautions[0];
         }

         if(!arrInfo.dietLabels){
            dietLabel = 'Not Available';
         }else{
            dietLabel = arrInfo.dietLabels;
         }

         for(i = 0; i < arrInfo.ingredientLines.length; i++){
            ingredient += `
               <li>${arrInfo.ingredientLines[i]}</li>
            `;
         }

         for(i = 0; i < 5; i++){
            healthLabel += `
               <li class='healthLabels'>${arrInfo.healthLabels[i]}</li>
            `
         }

         document.querySelector('.search-container').innerHTML = `
            <div class='details'>
               <div class='imgInfo'>
                  <img src='${arrInfo.image}' class='detailsImg'/>
                  <div>
                     <h1 class='infoHead'>${arrInfo.label}</h1>
                     <ul class='infos'>
                        <li>Diet Label: ${dietLabel}</li>
                        <li>Cautions : ${cautions}</li>
                        <li>Calories: ${arrInfo.calories}</li>
                        <li>Health Labels: ${healthLabel}</li>
                     </ul>
                  </div>
               </div>
               <div class='ingredientSec'>
                  <h1>Ingredients:</h1>
                  <ul class='ingredients'>${ingredient}</ul>
               </div>
            </div>
         `;
      }
   });
}