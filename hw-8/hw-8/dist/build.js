/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/app/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app/modules/request.js":
/*!***************************************!*\
  !*** ./src/js/app/modules/request.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction makeGETRequest(url) {\r\n    return new Promise((resolve, reject) => {\r\n        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');\r\n        xhr.onreadystatechange = function() {\r\n            //  console.log(xhr.status)\r\n            if (xhr.readyState === 4) {\r\n\r\n                if (xhr.status !== 200) {\r\n                    this.isError = true;\r\n                    console.log(this.isError)\r\n                    reject(xhr.status);\r\n                } else {\r\n                    const response = JSON.parse(xhr.responseText);\r\n                    resolve(response);\r\n                }\r\n\r\n            }\r\n        };\r\n        xhr.onerror = function(e) {\r\n            reject(e);\r\n        };\r\n        xhr.open('GET', url);\r\n        xhr.send();\r\n    });\r\n}\r\n\r\nfunction makePOSTRequest(url, data) {\r\n    return new Promise((resolve, reject) => {\r\n        const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');\r\n\r\n        xhr.onreadystatechange = function() {\r\n            if (xhr.readyState === 4) {\r\n                const response = JSON.parse(xhr.responseText);\r\n                if (xhr.status !== 200) reject(response);\r\n                resolve(response);\r\n            }\r\n        };\r\n\r\n        xhr.onerror = function(e) {\r\n            reject(e);\r\n        };\r\n\r\n        xhr.open('POST', url);\r\n        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');\r\n\r\n        xhr.send(JSON.stringify(data));\r\n    });\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    makeGETRequest,\r\n    makePOSTRequest\r\n});\n\n//# sourceURL=webpack:///./src/js/app/modules/request.js?");

/***/ }),

/***/ "./src/js/app/modules/total.js":
/*!*************************************!*\
  !*** ./src/js/app/modules/total.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction totalPrice(goods) {\r\n    return goods.reduce((total, good) => {\r\n        if (!good.price) return total;\r\n        return total += good.price * good.quantity;\r\n    }, 0);\r\n}\r\n\r\nfunction getTotalCartPriceMesage(total) {\r\n    return `В корзине товаров на сумму ${total}$`;\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n    totalPrice,\r\n    getTotalCartPriceMesage\r\n});\n\n//# sourceURL=webpack:///./src/js/app/modules/total.js?");

/***/ }),

/***/ "./src/js/app/script.js":
/*!******************************!*\
  !*** ./src/js/app/script.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_request_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/request.js */ \"./src/js/app/modules/request.js\");\n/* harmony import */ var _modules_total_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/total.js */ \"./src/js/app/modules/total.js\");\n\n\n\n//const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\nconst BASE_URL = '';\n\nVue.component('error-message', {\n    props: ['visible'],\n    template: `<div class=\"errorload\" v-bind:class=\"{ hide: !visible }\">\n                <span>Возникла ошибка при загрузке страницы</span>\n            </div>`\n})\n\n/**\n * Компоненты каталога товаров\n */\nVue.component('goods-item', {\n    props: ['good'],\n    methods: {\n        add() {\n            this.$emit('add', this.good);\n        }\n    },\n    template: `<div class=\"goods-item\">\n                    <h3>{{ good.product_name }}</h3>\n                    <p>{{ good.price }}$</p>\n                    <button @click.prevent=\"add\">Добавить в корзину</button>\n                </div>`\n});\n\nVue.component('goods-list', {\n    props: ['goods'],\n    computed: {\n        isGoodNotEmpty() {\n            return this.goods.length > 0;\n        }\n    },\n    methods: {\n        addTo(id_product) {\n            this.$emit('add', id_product);\n        }\n    },\n    template: `<div class=\"goods-list\" v-if=\"isGoodNotEmpty\">\n                    <goods-item v-for=\"good in goods\" @add=\"addTo\"\n                    :good=\"good\" :key=\"good.id_product\"></goods-item>\n                </div>\n                <div v-else>\n                  <h3 class=\"goods-null\"> Товары не найдены</h3>\n              </div>`\n});\n\n/**\n * Компоненты корзины\n */\nVue.component('basket', {\n    props: ['basketgoods', 'is_basket_empty', 'total_price_message', 'is_visible_cart'],\n    methods: {\n        visibility_triger() {\n            this.$emit('visible_cart', true);\n        },\n        del_items(id_product) {\n            this.$emit('del_item_cart', id_product);\n        },\n    },\n    template: `<div class=\"basket_block\">\n                    <button class=\"cart-button\" @click.prevent=\"visibility_triger()\">Корзина</button>\n                    <div class=\"basket\" v-bind:class=\"{ active: is_visible_cart }\">\n                        <basket-content  @del_item_cart=\"del_items\" :basketgoods=\"basketgoods\" :is_basket_empty=\"is_basket_empty\" :total_price_message=\"total_price_message\"></basket-content>\n                    </div>\n                </div>`\n})\n\n\nVue.component('basket-content', {\n    props: ['basketgoods', 'is_basket_empty', 'total_price_message'],\n    methods: {\n        del_items(id_product) {\n            this.$emit('del_item_cart', id_product);\n        }\n    },\n    template: ` <div >\n                    <template v-if=\"basketgoods.length == 0\">\n                        <h3 class=\"goods-null\"> В корзине нет товаров</h3>\n                    </template>\n                    <p class=\"totalCart\" v-bind:class=\"{ hide: is_basket_empty }\">{{total_price_message}}</p>\n                    <div class=\"basket-list\">\n                        <basket-list @del_item_cart=\"del_items\" v-bind:basketgoods=\"basketgoods\"></basket-list>\n                    </div>\n                    <button @click=\"del_items(0)\" v-bind:class=\"{ hide: is_basket_empty }\">Очистить корзину</button>\n                </div>`\n\n})\n\nVue.component('basket-list', {\n    props: ['basketgoods'],\n    methods: {\n        del_items(id_product) {\n            this.$emit('del_item_cart', id_product);\n        }\n    },\n    template: `<div class=\"basket-list\" >\n                <basket-item @del_item_cart=\"del_items\" v-for=\"basketgood in basketgoods\" :basketgood=\"basketgood\" :key=\"basketgood.id_product\"></basket-item>\n                </div>`\n\n});\n\nVue.component('basket-item', {\n    props: ['basketgood'],\n    methods: {\n        del_items() {\n            this.$emit('del_item_cart', this.basketgood.id_product);\n        }\n    },\n    template: `<div class=\"basket-list-item\">\n                    <div class=\"basket-list-item-info\">\n                        <h4>{{ basketgood.product_name }}</h4>\n                        <p>{{basketgood.price}}$</p>\n                        <p>{{basketgood.quantity}}&nbsp;шт.</p>\n                    </div>\n                    <button @click=\"del_items\" :data-id=basketgood.id_product>Удалить</button>\n                </div>`\n\n});\n\n/**\n * компонет поиска\n */\nVue.component('search', {\n    props: ['value'],\n    template: `<input type=\"text\" class=\" search goods-search\" \n                    v-bind:value=\"value\"\n                    v-on:input=\"$emit('input',$event.target.value)\"\n                    placeholder=\"Введите и нажмите Искать\" />`\n\n})\n\nconst app = new Vue({\n    el: '#app',\n    data: {\n        goods: [],\n        filteredGoods: [],\n        searchLine: '',\n        isVisibleCart: false,\n        isBasketEmpty: true,\n        basketGoods: [],\n        basketGoodsTotalprice: 0,\n        totalPriceMessage: '',\n        isError: false\n\n    },\n    mounted() {\n        this.getCatalog();\n        this.getCart();\n    },\n    methods: {\n        filterGoods() {\n            console.log(this.searchLine);\n            let rexp = new RegExp(this.searchLine, 'i');\n            this.filteredGoods = this.goods.filter(good => rexp.test(good.product_name));\n            console.log(this.filteredGoods);\n        },\n        getCatalog() {\n            _modules_request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].makeGETRequest(`${BASE_URL}/catalogData`).then((goods) => {\n                this.goods = goods;\n                this.filteredGoods = goods;\n                console.log(this.filteredGoods);\n            }).catch(err => {\n                this.isError = true;\n                //console.error(err);\n            });\n        },\n        getCart() {\n            _modules_request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].makeGETRequest(`${BASE_URL}/cart`).then((basket) => {\n                console.log(basket);\n                this.basketGoods = basket;\n                this.basketGoodsTotalprice = _modules_total_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].totalPrice(basket);\n                this.totalPriceMessage = _modules_total_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getTotalCartPriceMesage(this.basketGoodsTotalprice);\n                this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;\n            }).catch(err => {\n                // console.error(err);\n\n            });\n\n        },\n        addCart(good) {\n            _modules_request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].makePOSTRequest(`${BASE_URL}/addToCart`, good).then(response => {\n                if (response) {\n                    this.getCart();\n                    this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;\n                    this.basketGoodsTotalprice = _modules_total_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].totalPrice(this.basketGoods);\n                    this.totalPriceMessage = _modules_total_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getTotalCartPriceMesage(this.basketGoodsTotalprice);\n                } else {\n                    console.error(\"Не удалось добавить товар\");\n                }\n            }).catch(err => console.error(err));\n        },\n        delitemCart(id) {\n            _modules_request_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].makePOSTRequest(`${BASE_URL}/delToCart`, { id_product: id }).then(response => {\n                if (response) {\n                    this.getCart();\n                    this.isBasketEmpty = this.basketGoods.length > 0 ? false : true;\n                    this.basketGoodsTotalprice = _modules_total_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].totalPrice(this.basketGoods);\n                    this.totalPriceMessage = _modules_total_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getTotalCartPriceMesage(this.basketGoodsTotalprice);\n                } else {\n                    console.error(\"Не удалось удалить товар\");\n                }\n            }).catch(err => {\n                console.error(err);\n            });\n        }\n    }\n});\n\n//# sourceURL=webpack:///./src/js/app/script.js?");

/***/ })

/******/ });