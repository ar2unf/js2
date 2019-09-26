function totalPrice(goods) {
    return goods.reduce((total, good) => {
        if (!good.price) return total;
        return total += good.price * good.quantity;
    }, 0);
}

function getTotalCartPriceMesage(total) {
    return `В корзине товаров на сумму ${total}$`;
}

export default {
    totalPrice,
    getTotalCartPriceMesage
}