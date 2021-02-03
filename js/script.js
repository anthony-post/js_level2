// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//класс Список товаров Каталога
class ProductsList{
    // то, что указано в конструкторе будет присваиваться или запускаться в момент создания объекта
    constructor(container = '.products'){ //присваиваем значение по умолчанию свойству container
        this.container = container; //свойство контейнер, в который будет записываться верстка товара
        this.goods = []; //свойство массив, который будет наполняться товарами с помощью метода _fetchProducts()
        this._fetchProducts(); //будет происходить формирование массива товаров каталога в момент создания объекта класса ProductsList
        this.sumAllPrices(); //будет происходить подсчет суммы всех товаров каталога в момент создания объекта класса ProductsList
    } 
    //закрытый метод, к которому нельзя обращаться извне
    _fetchProducts(){

        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    //метод для вставки верстки в <div class='products'></div> 
    render() {
        //обращаемся к элементу DOM на странице, а именно, к <div class='products'></div>
        const block = document.querySelector(this.container);
        //обходим массив товаров с помощью цикла for of или forEach
        for(let product of this.goods){ //product - текущий элемент массива goods
            //создаем объект с помощью конструктора класса ProductItem, в который передаем product - текущий элемент массива
            const productObj = new ProductItem(product); //Объект в цикле for of создается для того, чтобы с помощью него вызывать методы класса товар и в этом классе вызывать метод render для получения верстки каждого товара, то есть мы в цикле получаем готовую верстку для каждого товара на основании свойств объекта товар из массива.
            //подставляем верстку для каждого товара путем вызова метода render() для объекта productObj из класса ProductItem
            block.insertAdjacentHTML('beforeend',productObj.render())
//            block.innerHTML += productObj.render();
        }
    }
    //метод, определяющий суммарную стоимость всех товаров
    sumAllPrices() {

        let sum = 0;

        for (let product of this.goods) {

            sum += product.price;
        }

        console.log(`Стоимость всех товаров в магазине равна ${sum}`);

        //альтернативный вариант подсчета стоимости всех товаров каталога с использованием метода reduce()

    }
    
}

//класс Товар Каталога
class ProductItem{

	constructor(product, img = 'https://placehold.it/180x180'){ //product - это объект товара с уже известными параметрами такими как id, title, price
                                                                //также добавляем картинку к товару
        //парсим объект, то есть извлекаем из него свойства
        this.title = product.title; 
		this.price = product.price;
		this.id = product.id;
		this.img = img;
	}
	//метод в котором будет возвращаться строка с нашей версткой
	render(){
		 return `<div class="product__item">
                    <img src="${this.img}" class="product__pic">
                    <h3 class="product__title">${this.title}</h3>
                    <div class="product__text">
                        <p class="product__price">${this.price}</p>
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
	}
}

let list = new ProductsList(); //создаем объект класса ProductsList (в этот момент срабатывают методы _fetchProducts() и sumAllPrices(), так как они указаны в конструкторе)

list.render(); //запускам метод render из класса ProductsList у созданного объекта

//класс Список товаров Корзины
class Cart {

    constructor(containerCart = '.cart__window') {

        this.containerCart = containerCart;
        this.goodsCart = [];
        this._getGoodsCart()
            .then(dataCart => {
                this.goodsCart = [...dataCart.contents]; //распаковываем и обращаемся к свойству contents для получения данных о товарах 
                this.render(); //запускаем метод render(), который формирует блок корзины с карточками товаров
            });
    }

    _getGoodsCart() {
        return fetch(`${API}/getBasket.json`) //читаем файл по url, который записан в API
                    .then(result => result.json())
                    .catch(error => {
                    console.log(error);
        })
    }

    render() {

        const  blockCart = document.querySelector(this.containerCart);

        for (let productCart of this.goodsCart) {
            
            const productObjCart = new CartItem (productCart);

            blockCart.insertAdjacentHTML('beforeend', productObjCart.render());
        }

        document.querySelector('.btn__cart').addEventListener('click', () => {

            let cartWrp = document.querySelector('.cart__wrp');

            cartWrp.classList.remove('invisible');

            // cartWindow.classList.toggle('invisible');
                
        });
    }

    addProduct() {}

    removeProduct() {}

    cartPrice() {}
}

//класс Товар Корзины (элемент корзины товаров)
class CartItem {

    constructor(productCart, img = 'https://placehold.it/80x80') {

        this.id_product = productCart.id_product;
        this.img = img;
        this.product_name = productCart.product_name; 
		this.price = productCart.price;
		this.quantity = productCart.quantity;
    }
    //формирование блока карточки товара для корзины
    render() {
        return `<div class="productCart__item">
                    <p class="productCart__id">Идентификатор: ${this.id_product}</p>
                    <img src="${this.img}" class="productCart__pic">
                    <h3 class="productCart__title">${this.product_name}</h3>
                    <p class="productCart__price">Цена: ${this.price}</p>
                    <p class="productCart__quantity">Количество: ${this.quantity}</p>
                </div>`
    }

}

let listCart = new Cart();

listCart.render();



    



