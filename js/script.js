const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/*function makeGETRequest(url, callback) {
  const xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText)
    }
  };

  xhr.open('GET', url);
  xhr.send();
}*/

function makeGETRequest(url){
  return new Promise((resolve, reject)=>{
    let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
  })
}


class GoodsItem {
  constructor(title = 'No name', price = 'No price', id) {
    this.title = title;
    this.price = price;
    this.id=id;
  }
  render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor(container = '.container') {
    this.container = container;
    this.goods = [];
  }
  totalPrice() {
    return this.goods.reduce((total, good) => {
      if (!good.price) return total;
      return total += good.price;
    }, 0);
  }
  /*fetchGoods(cb) {
    makeGETRequest(`${BASE_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    });
  }*/
  /*fetchGoods(cb){
    makeGETRequest(`${BASE_URL}/catalogData.json`)
    .then(response=>{
      this.goods =JSON.parse(response);
    }, reject=>{
      console.log(reject);

    })
    .then (()=>cb())
  }*/
  fetchGood (){
    return new Promise((resolve, reject)=>{
      makeGETRequest(`${BASE_URL}/catalogData.json`)
        .then(response=>{
            this.goods =JSON.parse(response);
            console.log(this.goods);
          resolve(true);
        }, reject=>{
            console.log(reject);
          resolve(false);
        })
    })
  }
  render() {
    document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
      const good = new GoodsItem(item.product_name, item.price);
      return acc += good.render();
    }, '');
  }
}

class Cart extends GoodsList {
  constructor(container = '.container',cartgoods =[] ){
    super(container)
    this.cartgoods =cartgoods;
  }
  add(good) {
    let isItemIn =false;
    this.cartgoods.forEach((item)=>{
      if (item.id == good.id){
        item.count ++;
        isItemIn =true;
        return;
      }
    })
    if(!isItemIn){
      let gooditem =new CartItem(good.title,good.price,good.id,1);
      this.cartgoods.push(gooditem);
    }
  }
  remove(id) {
    let  index_cartgoods = -1;
    this.cartgoods.forEach((item,index)=>{
      if (id==item.id){
        index_cartgoods=index;
        return
      }

    })
    if(index_cartgoods!=-1){
      if (this.cartgoods[index_cartgoods].count ==1){
          this.cartgoods.splice(index_cartgoods, 1);
      }else{
        this.cartgoods[index_cartgoods].count--;
      }
      
    }
    if (!id) {
      // clean cart
      this.cartgoods =[];
      return;
    }
  }
  update(id, good) {
    let  index_cartgoods = -1;
    this.cartgoods.forEach((item,index)=>{
      if (id==item.id){
        index_cartgoods=index;
      }
    })
    if(index_cartgoods !=-1){
      this.cartgoods[index_cartgoods].title=good.title;
      this.cartgoods[index_cartgoods].price=good.price;
      this.cartgoods[index_cartgoods].count=good.count;
    }
  }
  getCartListItemt(){
    return this.cartgoods;
  }
    
}

class CartItem extends GoodsItem {
  constructor(title = 'No name', price = 'No price',id, count = 1) {
    super(title, price);
    this.count = count;
    this.id =id;
  }
}

/** покзываем что загрузилось на страничке */
const list = new GoodsList('.goods-list');
list.fetchGood()
.then(respone => {
  if (respone){
    list.render();
  }
})

const cart = new Cart()
cart.add({title:"asd", price:200, id:989, count:1})
console.log(cart.cartgoods);
cart.add({title:"asd", price:200, id:989, count:1})// два одинаковых товара
console.log(cart.cartgoods);
cart.add({title:"asыd", price:200, id:988, count:1})
console.log(cart.cartgoods);
cart.remove (989);
console.log(cart.cartgoods);
cart.remove (988);
console.log(cart.cartgoods);
cart.update(989,{title:"кОШМАРИК", price:200, id:888, count:5} );
console.log(cart.cartgoods);
console.log(cart.getCartListItemt());

