// import { showLoader } from "./loader";

class Recipes{

   constructor(){
      this.apiId = '7cae6659';
      this.apiKey = '9af2a864e0e2a3be3e102390262e9b10';
   }

   async displayResult(foodName, startPoint, endPoint){
      
      const response = await fetch(`https://api.edamam.com/search?q=${foodName}&app_id=${this.apiId}&app_key=${this.apiKey}&from=${startPoint}&to=${endPoint}`);
      
      const outputData = await response.json();
      
      return outputData;
   }
}