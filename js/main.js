var options = ['carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin', 'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas', 'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery', 'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon', 'saffron', 'green bean', 'bean', 'chickpea', 'lentil', 'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon', 'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq', 'pudding', 'hamburger', 'pie', 'cake', 'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries', 'masala', 'paella', 'som tam', 'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup', 'parma ham', 'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas', 'bunny chow', 'pierogi', 'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb', 'turkey', 'pork', 'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs'];

var controlMenu = document.querySelector('#control-menu');
var menu = document.querySelector('#menu');
var menuList = document.querySelector('#menu ul');
var recipesContainer = document.querySelector('#recipes-container');
var recipeOrderBox = document.querySelector('#recipe-order-box');
var closeBtn = document.querySelector('#close-btn');
var recipeOrderContainer = document.querySelector('#recipe-order-container');

var searchBtn = document.querySelector('#search-btn');
var searchInput = document.querySelector('#search-input');
var query ='pizza';
controlMenu.addEventListener('click', function() {
    if (menu.style.left === '-100%') {
        menu.style.left = '0';
        controlMenu.classList.replace('text-white-50', 'text-white');
    } else {
        menu.style.left = '-100%';
        controlMenu.classList.replace('text-white', 'text-white-50');
    }
});

for (var i = 0; i < options.length; i++) {
    var optionEle = document.createElement('li');
    optionEle.classList.add('py-3', 'ps-3', 'border-bottom', 'fs-3');
    optionEle.setAttribute('id', options[i]);
    optionEle.innerHTML = `<span></span> <p>${options[i]}</p>`;
    menuList.appendChild(optionEle);
}

menuList.addEventListener('click', function(e) {
    if (e.target.tagName === 'P') {
        getApi(e.target.innerText);
        menu.style.left = '-100%';
    }
});


searchBtn.addEventListener('click', function() {
    var searchQuery = searchInput.value.trim().toLowerCase();
    if (options.includes(searchQuery)) {
        getApi(searchQuery); 
        console.log(searchQuery);
    }
    else{
        Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "the recipe you entered not found !",
  
});
    }
});


async function getApi(query) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        display(data.recipes);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




function display(response) {
    
       console.log(response.length);
    
    var str = '';

    for (var i = 0; i < response.length; i++) {
        str +=
            `<div class="col-md-4" id=${response[i].recipe_id}>
            <div class="recipe-box make-pointer bg-light shadow-lg border rounded">
                <div class="recipe-img">
                    <img src=${response[i].image_url} class='w-100' alt="">
                </div>
                <div class="content px-2">
                    <h3 class="my-3">${response[i].title}</h3>
                    <p>${response[i].publisher}</p>
                </div>
            </div>
        </div>`;
    }
    recipesContainer.innerHTML = str;
}

recipesContainer.addEventListener('click', function(e) {
    var recipeBox = e.target.closest('.col-md-4');
    if (recipeBox && recipeBox.id) {
        getRecipeDescription(recipeBox.id);
        recipeOrderContainer.classList.replace('d-none', 'd-flex');
    }
});

closeBtn.addEventListener('click', function() {
    recipeOrderContainer.classList.replace('d-flex', 'd-none');
});

recipeOrderContainer.addEventListener('click', function() {
    recipeOrderContainer.classList.replace('d-flex', 'd-none');
});

recipeOrderBox.addEventListener('click', function(e) {
    e.stopPropagation();
});

var recipeBoxImg = document.querySelector('#recipe-box-img');
var recipeTitle = document.querySelector('#recipe-title');
var recipePublisher = document.querySelector('#recipe-publisher');
var ingredientsMenu = document.querySelector('#ingredients-menu');

async function getRecipeDescription(req) {
    try {
        const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${req}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        showOrder(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function showOrder(req) {
    ingredientsMenu.innerHTML = '';
    for (var i = 0; i < req.recipe.ingredients.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = req.recipe.ingredients[i];
        li.classList.add('py-3');
        ingredientsMenu.appendChild(li);
    }
    recipeBoxImg.src = req.recipe.image_url;
    recipeTitle.innerText = req.recipe.title;
    recipePublisher.innerText = req.recipe.publisher;
}
getApi(query);