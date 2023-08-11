const searchForm=document.querySelector("form");
const searchResultDiv=document.querySelector(".Search-Result");
const container=document.querySelector(".container");
let searchQuery='';
const APP_ID ="08ddcecc";
const APP_key ="1960e605fecb1873cdeb297d8950f81a";

searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector('input').value;
    fetchAPI();

});
//fetching API   this fxn is reqd to fetch api 
async function fetchAPI(){
    const baseURL =`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}`; 
    const response = await fetch(baseURL);   // holding the response get fron the base url

    const data=await response.json();   //convert response to json    
    generateHTML(data.hits);
    console.log(data);

}

function generateHTML(results) {
    container.classList.remove('initial');
    let generatedHTML='';
    results.map(result=>{
        generatedHTML += 
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank" >View recipe</a>
            </div>
            <p class="item-data">Calories:${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Labels:${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels:'No data found'}</p>
            <p class="item-data">Health Labels:${result.recipe.calories.toFixed(2)}</p>
        </div>
        `
    })
    searchResultDiv.innerHTML = generatedHTML;

    // searchResultDiv.innerHTML=generatedHTML;

}

  