const { BASE_URL, KEY, KEY_SECRET } = process.env;
const authString = '?consumer_key=' + KEY + '&consumer_secret=' + KEY_SECRET;
module.exports = {
  readOrders:()=>{
    return {
      method: 'GET',
      url: BASE_URL + '/wp-json/wc/v3/orders' + authString,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  readProducts:()=>{
    return {
      method: 'GET',
      url: BASE_URL + '/wp-json/wc/v2/products' + authString,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  updateProducts:(data)=>{
    console.log(data)
    return {
      method: 'POST',
      url: BASE_URL + '/wp-json/wc/v3/products/batch' + authString,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data
    }
  },
  readCategories:()=>{
    return {
      method: 'GET',
      url: BASE_URL + '/wp-json/wc/v3/products/categories' + authString,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  readBrands:()=>{
    return {
      method: 'GET',
      url: BASE_URL + '/wp-json/wc/v3/products/tags' + authString,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
}