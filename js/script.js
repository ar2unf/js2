/*const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];*/

/*const renderGoodsItem = (title ='goods', price =0) =>  // уберем return укажем значения по умочанию
    `<div class="goods-item">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>`;*/

/*const renderGoodsList = list => { //уберем скобки
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));

        
    document.querySelector('.goods-list').innerHTML = goodsList.join(''); // преобразуем массив в строку без разделителей
}*/

/*window.onload = () => renderGoodsList(goods); // уберем фигурные скобки*/
class GoodsItem {
    constructor(title = 'No name', price = 'No price') {
      this.title = title;
      this.price = price;
    }
    /** рендер товара */
    render() {
      return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
  }
  
  class GoodsList {
    constructor(container = '.container') {
      this.container = container;
      this.goods = [];
    }
    /**заполняем массив */
    fetchGoods() {
      this.goods = [
        {title: 'Shirt', price: 150},
        {title: 'Socks', price: 50},
        {title: 'Jacket', price: 350},
        {title: 'Shoes', price: 250},
        {price: 350},
        {title: 'lambutens'}
      ];
    }
    /**
     * рендер списка товаров
     */
    render() {
      document.querySelector(this.container).innerHTML = this.goods.reduce((acc, item) => {
        const good = new GoodsItem(item.title, item.price);
        return acc += good.render();
      }, '');
    }
    /**
     * метод определяющий суммарную соимость товаров списка
     */
    getTotalPriceGoods(){
        return this.goods.reduce((acc,item)=>{
            /**проверям на число */
            let isNumber =item.price!='No price' && item.price!=undefined
            return acc += isNumber ? Number(item.price) : 0;
        }, 0)
    }
  }
  /**расширения для товаров в корзине */
  class GoodsBasketItem extends GoodsItem {
      constructor(title, price, count=1){
          super(title,price);
          this.count=count;
      }
      
  }
/**класс корзины */
  class Basket{
      constructor(goods =[]){
          this.goods =goods;
      }
      /**инициализация передача других объектов, создание в DOM */
      init(){}
      /** добавить в корзину товар*/
      addGood(Goodsitem, count =1){}
      /**удалить из корзины товар */
      delGood(GoodsItem, count =1){}
      /**изменить количество товара */
      setCountGood(){}
      /**очистить корзину */
      clearBasket(){}
      /**посчитать стоимость */
      totalPriceGoods(){}
      /** обновления в DOM */
      render(){}
  };
  
  
  document.addEventListener('DOMContentLoaded', ()=>{
    const list = new GoodsList('.goods-list');
    list.fetchGoods();
    list.render();
    console.log(list.getTotalPriceGoods()); //тест функции getTotalPriceGoods
  }, false)
  
