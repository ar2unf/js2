const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        isBasketEmpty: true,
        basketGoods: [],
        basketGoodsTotalprice: 0,
        totalPriceMessage: ''

    },
    mounted() {
        this.getCatalog();
        this.getCart();
    },
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        const response = JSON.parse(xhr.responseText);
                        if (xhr.status !== 200) reject(response);
                        resolve(response);
                    }
                };
                xhr.onerror = function(e) {
                    reject(e);
                };
                xhr.open('GET', url);
                xhr.send();
            });
        },
        filterGoods() {
            console.log(this.searchLine);
            let rexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => rexp.test(good.product_name));
            console.log(this.filteredGoods);
        },
        getCatalog() {
            this.makeGETRequest(`${BASE_URL}/catalogData.json`).then((goods) => {
                this.goods = goods;
                this.filteredGoods = goods;
                console.log(this.filteredGoods);
            }).catch(err => console.error(err));
        },
        getCart() {
            this.makeGETRequest(`${BASE_URL}/getBasket.json`).then((basket) => {
                console.log(basket);
                this.basketGoodsTotalprice = basket.amount;
                this.basketGoods = basket.contents;
                this.getTotalCartPriceMesage(this.basketGoodsTotalprice);
                this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;
            }).catch(err => console.error(err));

        },
        totalPrice(goods) {
            return goods.reduce((total, good) => {
                if (!good.price) return total;
                return total += good.price * good.quantity;
            }, 0);
        },
        getTotalCartPriceMesage(total) {
            this.totalPriceMessage = `В корзине товаров на сумму ${total}$`;
        },
        addCart(good) {
            this.makeGETRequest(`${BASE_URL}/addToBasket.json`).then(response => {
                if (response) {

                    goodIsalreadyBasket = false;
                    this.basketGoods.forEach(item => {
                        console.log(good);
                        console.log(this.basketGoods);
                        let thisId = good.id_product

                        if (thisId == item.id_product) {
                            console.log()
                            item.quantity += 1;
                            console.log("item.quantity" + item.quantity);
                            console.log("good.quantity" + good.quantity);
                            goodIsalreadyBasket = true;
                            return;
                        }
                    })
                    if (!goodIsalreadyBasket) {
                        good.quantity = 1;
                        this.basketGoods.push(good);
                    }
                    this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;
                    this.basketGoodsTotalprice = this.totalPrice(this.basketGoods);
                    console.log(this.basketGoodsTotalprice);
                    this.getTotalCartPriceMesage(this.basketGoodsTotalprice);
                    //this.basketGoods.push(good);
                    console.log(response);
                    console.log(good);
                    console.log(this.basketGoods);
                } else {
                    console.error("Не удалось добавить товар")
                }
            }).catch(err => console.error(err));
        },
        delitemCart(id) {
            this.makeGETRequest(`${BASE_URL}/deleteFromBasket.json`).then(response => {
                if (response) {
                    if (!id) {
                        this.basketGoods = [];
                        this.basketGoodsTotalprice = this.totalPrice(this.basketGoods);
                        this.getTotalCartPriceMesage(this.basketGoodsTotalprice);
                        this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;
                        return;
                    }
                    let idItem;
                    this.basketGoods.forEach((item, i) => {
                        let thisId = item.id_product;
                        if (id == thisId) {
                            idItem = i;
                        }
                    });
                    this.basketGoods.splice(idItem, 1);
                    this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;
                    this.basketGoodsTotalprice = this.totalPrice(this.basketGoods);
                    this.getTotalCartPriceMesage(this.basketGoodsTotalprice);
                } else {
                    console.error("Не удалось удалить товар");
                }
            }).catch(err => console.error(err));
            //deleteFromBasket.json

        }
    }
});