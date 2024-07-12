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
   
    resipesContainer.innerHTML = '';

    if (response.length === 0) {
        return;
    }

    for (var i = 0; i < response.length; i++) {
        var colDiv = document.createElement('div');
        colDiv.classList.add('col-md-4', 'mb-4');
        colDiv.setAttribute('id', response[i].recipe_id);

        var recipeBoxDiv = document.createElement('div');
        recipeBoxDiv.classList.add('resipe-box', 'make-pointer', 'bg-light', 'shadow-lg', 'border', 'rounded');

        var recipeImgDiv = document.createElement('div');
        recipeImgDiv.classList.add('resipe-img');

        var img = document.createElement('img');
        img.classList.add('w-100');
        img.setAttribute('src', response[i].image_url);
        img.setAttribute('alt', '');

        recipeImgDiv.appendChild(img);
        recipeBoxDiv.appendChild(recipeImgDiv);

        var contentDiv = document.createElement('div');
        contentDiv.classList.add('content', 'px-2');

        var title = document.createElement('h3');
        title.classList.add('my-3');
        title.textContent = response[i].title;

        var publisher = document.createElement('p');
        publisher.textContent = response[i].publisher;

        contentDiv.appendChild(title);
        contentDiv.appendChild(publisher);
        recipeBoxDiv.appendChild(contentDiv);
        colDiv.appendChild(recipeBoxDiv);
        resipesContainer.appendChild(colDiv);
    }
    window.location.href = '#resipes-container';
    console.log(response);
}

getApi(query);