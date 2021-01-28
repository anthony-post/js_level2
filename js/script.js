//класс Список товаров
class ProductsList{

    constructor(container = '.products'){ //присваиваем значение по умолчанию свойству container
        this.container = container; //свойство контейнер, в который будет записываться верстка товара
        this.goods = []; //свойство массив, который будет наполняться товарами с помощью метода _fetchProducts()
        this._fetchProducts(); //свойство метод _fetchProducts(), который описан ниже
        this.sumAllPrices();
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
            const productObj = new ProductItem(product);
            //подставляем верстку для каждого товара
            block.insertAdjacentHTML('beforeend',productObj.render())
//            block.innerHTML += productObj.render();
        }
    }
    //метод, определяющий суммарную стоимость всех товаров
    sumAllPrices() {

        let sum = 0;;

        for (let product of this.goods) {

            sum += product.price;
        }

        console.log(`Стоимость всех товаров в магазине равна ${sum}`);

    }
    
}

//класс Товар
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

let list = new ProductsList(); //создаем объект класса ProductsList

list.render(); //запускам метод render из класса ProductsList у созданного объекта

//класс Корзины
class Cart {

    constructor() {


    }

    render() {}

    addProduct() {}

    removeProduct() {}

    cartPrice() {}
}

//класс элемента корзины товаров
class CartItem {

    constructor() {


    }

    render() {}

}




    



