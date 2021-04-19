require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

const {UpdateProducts, ReadOrders, ReadCategories, ReadBrands} = require('./controllers');

app.get('/',(req,res)=>{
    res.send("todo salio cool")
})

app.post('/products',UpdateProducts);
app.get('/orders', ReadOrders);
app.get('/categories', ReadCategories);
app.get('/brands', ReadBrands);

app.listen(3000);