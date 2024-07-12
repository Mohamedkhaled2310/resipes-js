var options = ['carrot', 'broccoli', 'asparagus', 'cauliflower', 'corn', 'cucumber', 'green pepper', 'lettuce', 'mushrooms', 'onion', 'potato', 'pumpkin', 'red pepper', 'tomato', 'beetroot', 'brussel sprouts', 'peas', 'zucchini', 'radish', 'sweet potato', 'artichoke', 'leek', 'cabbage', 'celery', 'chili', 'garlic', 'basil', 'coriander', 'parsley', 'dill', 'rosemary', 'oregano', 'cinnamon', 'saffron', 'green bean', 'bean', 'chickpea', 'lentil', 'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blackcurrant', 'blueberry', 'boysenberry', 'cherry', 'coconut', 'fig', 'grape', 'grapefruit', 'kiwifruit', 'lemon', 'lime', 'lychee', 'mandarin', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'passion fruit', 'peach', 'pear', 'pineapple', 'plum', 'pomegranate', 'quince', 'raspberry', 'strawberry', 'watermelon', 'salad', 'pizza', 'pasta', 'popcorn', 'lobster', 'steak', 'bbq', 'pudding', 'hamburger', 'pie', 'cake', 'sausage', 'tacos', 'kebab', 'poutine', 'seafood', 'chips', 'fries', 'masala', 'paella', 'som tam', 'chicken', 'toast', 'marzipan', 'tofu', 'ketchup', 'hummus', 'chili', 'maple syrup', 'parma ham', 'fajitas', 'champ', 'lasagna', 'poke', 'chocolate', 'croissant', 'arepas', 'bunny chow', 'pierogi', 'donuts', 'rendang', 'sushi', 'ice cream', 'duck', 'curry', 'beef', 'goat', 'lamb', 'turkey', 'pork', 'fish', 'crab', 'bacon', 'ham', 'pepperoni', 'salami', 'ribs'];

var controlMenu = document.querySelector('#control-menu');
var menu = document.querySelector('#menu');
var menuList = document.querySelector('#menu ul');
var searchBtn = document.querySelector('#search-btn');
var searchInput = document.querySelector('#search-input');
var resipesContainer = document.querySelector('#resipes-container');
var query = 'potato';

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
    optionEle.innerHTML = `<a href="#resipes-container" class="btn text-left text-white-50" onclick="getApi('${options[i]}')">${options[i]}</a>`;
    menuList.appendChild(optionEle);
}

searchBtn.addEventListener('click', function() {
    var searchQuery = searchInput.value.trim();
    if (searchQuery) {
        getApi(searchQuery); 
    }
});

function getApi(query) {
    fetch(`https://forkify-api.herokuapp.com/api/search?q=${query}`)
        .then(response => response.json())
        .then(data => display(data.recipes))
        .catch(error => console.error('Data Not Found:', error));
}

function display(response) {
    var str = '';

    if (response.length === 0) {
        alert('The word not found.');
        return;
    }

    for (var i = 0; i < response.length; i++) {
        str += 
        `<div class="col-md-4 mb-4" id=${response[i].recipe_id}>
            <div class="resipe-box make-pointer bg-light shadow-lg border rounded">
                <div class="resipe-img">
                    <img src=${response[i].image_url} class='w-100' alt="">
                </div>
                <div class="content px-2">
                    <h3 class="my-3">${response[i].title}</h3>
                    <p>${response[i].publisher}</p>
                </div>
            </div>
        </div>`;
    }
    resipesContainer.innerHTML = str;
    window.location.href = '#resipes-container';
    console.log(response);
}

getApi(query);