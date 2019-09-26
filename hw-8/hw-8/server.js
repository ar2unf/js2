const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();


app.use(express.static('.'));
app.use(bodyParser.json());
var logger = fs.createWriteStream('stats.json',{
  flags:'a'
});


function writeLog(action, id, name){
  logger.write(
    `{
      "action":"${action}", 
      "id_product":"${id}",
      "name": "${name}", 
      "time":"${new Date()}"
  },
  `)
}

app.listen(3000, () => {
  console.log('server is running');
  
});

app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf-8', (err, data) => {
    res.send(data);
  })
});
app.get('/cart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    res.send(data);
  })
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    const cart = JSON.parse(data);
    const good = req.body;
    writeLog('add', good.id_product,good.product_name);
    let goodIsredyCart =false;
    cart.forEach(item=>{
      let thisId = good.id_product;
      if(thisId == item.id_product){
        item.quantity+=1;
        goodIsredyCart =true;
      }
    });
    if(!goodIsredyCart){
      good.quantity=1;
      cart.push(good);
    }
    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
      if (err) {
        res.send(JSON.stringify({
          result: 0
        }))
      } else {
        res.send(JSON.stringify({
          result: 1
        }))
      }
    })
  })
});

app.post('/delToCart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    let cart = JSON.parse(data);
    
    const id_goods = req.body;
    console.log(id_goods.id_product);

    if(!id_goods.id_product){
      cart =[];
    } else{
      cart.forEach((item,i)=>{
        let thisId = item.id_product;
        if(id_goods.id_product==thisId){
          item.quantity-=1;
          writeLog('del', item.id_product,item.product_name);
          if(item.quantity == 0){
            cart.splice(i,1);
          }
        }
      });
    }
    
    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
      if (err) {
        res.send(JSON.stringify({
          result: 0
        }))
      } else {
        res.send(JSON.stringify({
          result: 1
        }))
      }
    })
  })
});

