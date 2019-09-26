import request from './modules/request.js';
import total from './modules/total.js';

//const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const BASE_URL = '';

Vue.component('error-message', {
    props: ['visible'],
    template: `<div class="errorload" v-bind:class="{ hide: !visible }">
                <span>Возникла ошибка при загрузке страницы</span>
            </div>`
})

/**
 * Компоненты каталога товаров
 */
Vue.component('goods-item', {
    props: ['good'],
    methods: {
        add() {
            this.$emit('add', this.good);
        }
    },
    template: `<div class="goods-item">
                    <h3>{{ good.product_name }}</h3>
                    <p>{{ good.price }}$</p>
                    <button @click.prevent="add">Добавить в корзину</button>
                </div>`
});

Vue.component('goods-list', {
    props: ['goods'],
    computed: {
        isGoodNotEmpty() {
            return this.goods.length > 0;
        }
    },
    methods: {
        addTo(id_product) {
            this.$emit('add', id_product);
        }
    },
    template: `<div class="goods-list" v-if="isGoodNotEmpty">
                    <goods-item v-for="good in goods" @add="addTo"
                    :good="good" :key="good.id_product"></goods-item>
                </div>
                <div v-else>
                  <h3 class="goods-null"> Товары не найдены</h3>
              </div>`
});

/**
 * Компоненты корзины
 */
Vue.component('basket', {
    props: ['basketgoods', 'is_basket_empty', 'total_price_message', 'is_visible_cart'],
    methods: {
        visibility_triger() {
            this.$emit('visible_cart', true);
        },
        del_items(id_product) {
            this.$emit('del_item_cart', id_product);
        },
    },
    template: `<div class="basket_block">
                    <button class="cart-button" @click.prevent="visibility_triger()">Корзина</button>
                    <div class="basket" v-bind:class="{ active: is_visible_cart }">
                        <basket-content  @del_item_cart="del_items" :basketgoods="basketgoods" :is_basket_empty="is_basket_empty" :total_price_message="total_price_message"></basket-content>
                    </div>
                </div>`
})


Vue.component('basket-content', {
    props: ['basketgoods', 'is_basket_empty', 'total_price_message'],
    methods: {
        del_items(id_product) {
            this.$emit('del_item_cart', id_product);
        }
    },
    template: ` <div >
                    <template v-if="basketgoods.length == 0">
                        <h3 class="goods-null"> В корзине нет товаров</h3>
                    </template>
                    <p class="totalCart" v-bind:class="{ hide: is_basket_empty }">{{total_price_message}}</p>
                    <div class="basket-list">
                        <basket-list @del_item_cart="del_items" v-bind:basketgoods="basketgoods"></basket-list>
                    </div>
                    <button @click="del_items(0)" v-bind:class="{ hide: is_basket_empty }">Очистить корзину</button>
                </div>`

})

Vue.component('basket-list', {
    props: ['basketgoods'],
    methods: {
        del_items(id_product) {
            this.$emit('del_item_cart', id_product);
        }
    },
    template: `<div class="basket-list" >
                <basket-item @del_item_cart="del_items" v-for="basketgood in basketgoods" :basketgood="basketgood" :key="basketgood.id_product"></basket-item>
                </div>`

});

Vue.component('basket-item', {
    props: ['basketgood'],
    methods: {
        del_items() {
            this.$emit('del_item_cart', this.basketgood.id_product);
        }
    },
    template: `<div class="basket-list-item">
                    <div class="basket-list-item-info">
                        <h4>{{ basketgood.product_name }}</h4>
                        <p>{{basketgood.price}}$</p>
                        <p>{{basketgood.quantity}}&nbsp;шт.</p>
                    </div>
                    <button @click="del_items" :data-id=basketgood.id_product>Удалить</button>
                </div>`

});

/**
 * компонет поиска
 */
Vue.component('search', {
    props: ['value'],
    template: `<input type="text" class=" search goods-search" 
                    v-bind:value="value"
                    v-on:input="$emit('input',$event.target.value)"
                    placeholder="Введите и нажмите Искать" />`

})

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
        totalPriceMessage: '',
        isError: false

    },
    mounted() {
        this.getCatalog();
        this.getCart();
    },
    methods: {
        filterGoods() {
            console.log(this.searchLine);
            let rexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => rexp.test(good.product_name));
            console.log(this.filteredGoods);
        },
        getCatalog() {
            request.makeGETRequest(`${BASE_URL}/catalogData`).then((goods) => {
                this.goods = goods;
                this.filteredGoods = goods;
                console.log(this.filteredGoods);
            }).catch(err => {
                this.isError = true;
                //console.error(err);
            });
        },
        getCart() {
            request.makeGETRequest(`${BASE_URL}/cart`).then((basket) => {
                console.log(basket);
                this.basketGoods = basket;
                this.basketGoodsTotalprice = total.totalPrice(basket);
                this.totalPriceMessage = total.getTotalCartPriceMesage(this.basketGoodsTotalprice);
                this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;
            }).catch(err => {
                // console.error(err);

            });

        },
        addCart(good) {
            request.makePOSTRequest(`${BASE_URL}/addToCart`, good).then(response => {
                if (response) {
                    this.getCart();
                    this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;
                    this.basketGoodsTotalprice = total.totalPrice(this.basketGoods);
                    this.totalPriceMessage = total.getTotalCartPriceMesage(this.basketGoodsTotalprice);
                } else {
                    console.error("Не удалось добавить товар");
                }
            }).catch(err => console.error(err));
        },
        delitemCart(id) {
            request.makePOSTRequest(`${BASE_URL}/delToCart`, { id_product: id }).then(response => {
                if (response) {
                    this.getCart();
                    this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;
                    this.basketGoodsTotalprice = total.totalPrice(this.basketGoods);
                    this.totalPriceMessage = total.getTotalCartPriceMesage(this.basketGoodsTotalprice);
                } else {
                    console.error("Не удалось удалить товар");
                }
            }).catch(err => {
                console.error(err);
            });
        }
    }
});