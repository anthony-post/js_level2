//Массив со списком товаров
const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];

/**
 * Функция возвращает разметку для конкретного товара, подставляя его фото, название, цену и другое.
 * @param {string} title - наименование товара
 * @param {string} price - цена товара 
 * @return шаблонный литерал в виде блока с версткой, в который подставляются характеристики товара
*/
const renderProduct = (objProd) => {
    return `<div class="product__item">
                <img src="http://placehold.it/180x180" class="product__pic">
                <h3 class="product__title">${objProd.title}</h3>
                <div class="product__text">
                    <p class="product__price">${objProd.price}</p>
                    <button class="buy__btn">Купить</button>
                </div>
                <p class="product__raiting">Рейтинг 
                    <i id="first" class="fas fa-star"></i>
                    <i id="second" class="fas fa-star"></i>
                    <i id="third" class="fas fa-star"></i>
                    <i id="fourth" class="fas fa-star"></i>
                    <i id="fifth" class="fas fa-star"></i>
                </p>
            </div>`
};

/**
 * Функция собирает все товары в один список и записывает его в контейнер .products
 * @param {array} list - массив, который передается в качестве параметра на вход функции renderPage.
 * К массиву list применяется метод map(), который возвращает новый массив на основе текущего в результате выпонения стрелочной функции, где item - каждый элемент массива.
 * @param {object} item - переменная, в которую записывается каждый элемент массива list (объект). 
 * @param {array} productsList - константа в виде массива, в которую записывается верстка
*/
const renderPage = list => {

    //запятые появляются потому что из renderProduct возвращается массив строк, а все элементы массива разделены запятыми
    //const productsList = list.map(item => renderProduct(item.title, item.price));

    //Решением может быть применение join() к массиву, которые убирает запятые между элементами массива
    const productsList = list.map(item => renderProduct(item)).join(''); 
    
    console.log(productsList);
    
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);