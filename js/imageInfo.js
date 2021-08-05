
export function detailedInfo(info){

   document.querySelector('.recipe-disp').addEventListener('click' , (e) => {

      if(e.target.classList.contains('recipeImage') || e.target.classList.contains('infoItem') ){

         document.querySelector('.search-container').style.display = 'none';
         document.querySelector('.details-container').style.display = 'flex';

         const contentID = e.target.parentNode.parentNode.id;

         const recipe = info.hits.find(hit => hit.recipe.uri === contentID);

         displayDetails(recipe.recipe);
      }

      function displayDetails(arrInfo){
         let cautions, dietLabel, ingredient = '',mealType ,cuisineType ,i;

         if(!arrInfo.cautions[0] || arrInfo.cautions[0] === 'FODMAP'){
            cautions = 'Not Available';
         }else{
            cautions = arrInfo.cautions[0];
         }

         if(!arrInfo.dietLabels[0]){
            dietLabel = 'Not Available';
         }else{
            dietLabel = arrInfo.dietLabels;
         }

         if(!arrInfo.mealType){
            mealType = 'Not Available';
         }else{
            mealType = arrInfo.mealType;
         }
   
         if(!arrInfo.cuisineType){
            cuisineType = 'Not Available';
         }else{
            cuisineType = arrInfo.cuisineType;
         }

         for(i = 0; i < arrInfo.ingredientLines.length; i++){ 
            ingredient += ` <li class='ingredients-tag'>${arrInfo.ingredientLines[i]}</li> `;
         }

         document.querySelector('.details-container').innerHTML = `
            <div class='details'>
               <div class='heading'>
                  <a class='back'><i class="fas fa-arrow-left"></i></a>
                  <h1 class='info-head'>${arrInfo.label}</h1>
               </div>
               <div class='recipe-ingredients'>
                  <div class='image-sec'>
                     <img src='${arrInfo.image}' class='details-img'/>
                     <button class='favorites'>Add to favorites</button>
                  </div>
                  <div class='ingredients-sec'>
                     <div>
                        <h1 class='ingr-title'>Ingredients:</h1>
                        <ul class='ingredients'>${ingredient}</ul>
                     </div>
                     <div class='full-recipe'>
                        <p class='link-guide'>For full recipe:</p>
                        <a href='${arrInfo.url}' target='_blank' class='recipe-link'>View Recipe</a>
                     </div>
                  </div>
               </div>
               <div class='add-info'>
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
                     <li class='tags'>${arrInfo.calories}</li>
                  </ul>
                  <button class='view-more'>View More</button>
               </div>  
            </div> 
         `;

         document.querySelector('.back').addEventListener('click' , () => {
            document.querySelector('.search-container').style.display = 'flex';
            document.querySelector('.details-container').style.display = 'none';
         });

         document.querySelector('.view-more').addEventListener('click' , (e) => {
            document.querySelector('.view-more').style.display = 'none';
            console.log(arrInfo);

            let digest = '', healthLabel = '';

            for(i = 0; i < 10; i++){
               healthLabel += `
                  <li class='tags arr-tags'>${arrInfo.healthLabels[i]}</li>
               `
            }

            for(i = 0; i < 10; i++){
               digest += `
                  <li class='tags arr-tags'>${arrInfo.digest[i].label}: ${arrInfo.digest[i].total}${arrInfo.digest[i].unit}</li>
               `;
            }
            
            document.querySelector('.infos').innerHTML += `
               <li>Health Labels:</li>
               <ul class='array-item'>${healthLabel}</ul>
               <li>Nutrients:</li>
               <ul class='array-item'>${digest}</ul>
            `;
         });
      }
   });
}