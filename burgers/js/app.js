const size = {
    small: {size: "smallburger", price: 50 , cal:20},
    big: {size: "bigburger", price: 100, cal: 40}
}

const stuffing = {
    cheese:{stuffname: "cheese", price: 10 , cal:20},
    saled:{stuffname: "saled", price: 20 , cal:5},
    potato:{stuffname: "potato", price: 15 , cal:10}
}
const topping ={
    spice:{toppingname:"spice", price: 15, cal: 0},
    mayo:{toppingname:"mayo", price: 20, cal: 5}
}


class Hamburger {
    /**
     * 
     * @param {size} size 
     * @param {stuffing} stuffing 
     * @param {topping} topping 
     */
    constructor(size =size.small, stuffing=stuffing.saled, topping=null) { 
        this.size =size;
        this.stuffing =stuffing;
        this.topping=topping;
     }
     // Добавить /изменить добавку 
    addTopping(topping) { 
        this.topping =topping;
       }
    // Убрать добавку
    removeTopping() { 
        this.topping =null;
     }
    // Получить список добавок
    getToppings(topping) { 
        return this.topping!=null? this.topping.toppingname: "nofing topping";
        
       }
    // Узнать размер гамбургера
    getSize() { 
        return this.size.size;  
        
                }
    // Узнать начинку гамбургера
    getStuffing() { 
        return this.stuffing.stuffname; 
        
            }
     // Узнать цену
    calculatePrice() {   
        let total_price =0;
        total_price += this.topping != null ? this.topping.price: 0;
        total_price += this.stuffing.price + this.size.price;
        return total_price;

        }
    // Узнать калорийность
    calculateCalories() {
        let total_cal =0;
        total_cal += this.topping != null ? this.topping.cal: 0;
        total_cal += this.stuffing.cal + this.size.cal;
        return total_cal;
        }
  }

/**тест работы класса */
  let hamb = new Hamburger(size.big,stuffing.cheese);
  console.log(hamb);
  hamb.addTopping(topping.mayo);
  console.log(hamb);
  hamb.removeTopping();
  console.log(hamb);
  console.log(hamb.getSize());
  console.log(hamb.getStuffing());
  console.log(hamb.getToppings());
  console.log(`burgers price ${hamb.calculatePrice()} rouble`);
  console.log(`burgers calories ${hamb.calculateCalories()} Kcal`);
  
