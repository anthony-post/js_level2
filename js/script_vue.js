const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json', //частичный путь к файлу каталога с товарами
        goods: [], //массив товаров каталога в который записываются данные из файла catalogData.json
        imgCatalog: 'https://placehold.it/180x180',
        userSearch: '', //в это свойство записывается то, что вводит пользователь в строке поиска
        isVisibleCart: false, //это свойство для управления видимостью Корзины товаров
        filtered: []
    },

    methods: {
        getJsonCatalog(url) { //в этом методе парсим url
            return fetch(url)
                        .then(result => result.json()) //преобразуем файл catalogData.json в объект для последующей работы с ним
                        .catch(error => {
                            console.log(error);
                        })
        },

        addProduct(product) {
            console.log(product.id_product);
        },

        filterGoods() {

            let regexp = new RegExp(this.userSearch, 'i'); //регулярное выражение 

            //к массиву filtered применяем встроенный метод filter (у любого массива есть встроенный метод filter) на вход которого принимаем функцию
            this.filtered = this.filtered.filter(el => regexp.test(el.product_name)); //в этой функции берем каждый товар и сопоставляем его с именем товара

            // this.filtered = this.goods.filter(el => regexp.test(el.product_name));

            // this.goods.forEach(item => {

            //     const block = document.querySelector(`.product-item[data-name="${item.product_name}"]`);

            //     if (userSearch !== item.product_name) {
            //         // alert('GOT IT!!!');
            //         block.classList.add('invisible');
            //     }
            // });
        }
    },
//начало выполнения кода
    mounted() { 
        this.getJsonCatalog(`${API + this.catalogUrl}`)
            .then(data => { //объект Java Script в котором содержатся данные из файла catalogData.json
                for (let element of data) { //перебираем все товары из каталога и
                    this.$data.goods.push(element); //подставляем в массив goods
                    this.filtered.push(element); //подставляем в массив filtered
                }
            })
    }
})