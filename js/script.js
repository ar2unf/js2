const goods = [
    {title: 'Shirt', price: 150},
    {title: 'Socks', price: 50},
    {title: 'Jacket', price: 350},
    {title: 'Shoes', price: 250},
];

const renderGoodsItem = (title ='goods', price =0) =>  // уберем return укажем значения по умочанию
    `<div class="goods-item">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>`;

const renderGoodsList = list => { //уберем скобки
    const goodsList = list.map(item => renderGoodsItem(item.title, item.price));

        /*document.querySelector('.goods-list').innerHTML = goodsList;*/ // выводит массив с запятыми
    document.querySelector('.goods-list').innerHTML = goodsList.join(''); // преобразуем массив в строку без разделителей
}

window.onload = () => renderGoodsList(goods); // уберем фигурные скобки
