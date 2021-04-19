const axios = require('axios');
const { validate } = require('jsonschema');
const action = require('./queries');


const productsSchema = {
  type: "object",
  properties: {
    sku: { 
      type: "string",
      minLength: 5
    },
    stock_quantity:{
      type:"number"
    },
    name: { 
      type: "string",
      minLength: 4
    },
    type: { 
      type: "string",
      minLength: 5
    },
    regular_price: { 
      type: "number"
    },
    description: { 
      type: "string",
      minLength: 5
    },
    short_description: { 
      type: "string",
      minLength: 5
    },
    tags: { 
      type: "array",
      item:{
        properties:{
          id:"number"
        }
      }
    },
    categories: { 
      type: "array",
      item:{
        properties:{
          id:"number"
        }
      }
    },
    images: { 
      type: "array",
      item:{
        properties:{
          id:"string"
        }
      }
    }
  },
  required:["sku"]
}


const UpdateProducts = async (req, res) => {
  try {

    let { products } = req.body;
    const { data } = await axios(action.readProducts());

    let update = [];
    let create = [];
    let refused = [];

    products.map(item=>{
      const foundItem = data.find(product=>{
        return product.sku == item.sku;
      });
      if(!validate(item,productsSchema).valid){
        refused.push(item);
      }else if(foundItem != undefined){
        update.push({...item,id:foundItem.id})
      }else{
        create.push({...item,manage_stock:true})
      }

    });

    (await axios(action.updateProducts({update,create})));

    res.json({update,create,refused})

  } catch (error) {
    console.log(error);
    res.send("error:",error);
  }
}

const ReadOrders = async (req,res) => {
  try {
    const response = (await axios(action.readOrders()));
    res.json({orders:response.data})
  } catch (error) {
    console.log(error);
    res.send("error:",error);
  }
}

const ReadCategories = async (req,res) => {
  try {
    const response = (await axios(action.readCategories()));
    res.json({categories:response.data})
  } catch (error) {
    console.log(error);
    res.send("error:",error);
  }
}

const ReadBrands = async (req,res) => {
  try {
    const response = (await axios(action.readBrands()));
    res.json({brands:response.data})
  } catch (error) {
    console.log(error);
    res.send("error:",error);
  }
}

module.exports = { UpdateProducts,ReadOrders,ReadCategories, ReadBrands };