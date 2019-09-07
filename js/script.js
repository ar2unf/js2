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
  constructor(title = 'No name', price = 'No price') {
    this.title = title;
    this.price = price;
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
          resolve(true);
        }, reject=>{
            console.log(reject);
          resolve(false);
          reject(reject);
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
  add(good) {}
  remove(id) {
    if (!id) {
      // clean cart
      return;
    }
  }
  update(id, good) {}
}

class CartItem extends GoodsItem {
  constructor(title = 'No name', price = 'No price', count = 1) {
    super(title, price);
    this.count = count;
  }
}


const list = new GoodsList('.goods-list');
list.fetchGood()
.then(respone => {
  if (respone){
    list.render();
  }
})
