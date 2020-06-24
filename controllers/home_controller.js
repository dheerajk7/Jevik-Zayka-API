const Product = require('../models/product');

module.exports.home = async function(request, response)
{
    try
    {

    }
    catch(err)
    {
        console.log('Error in getting Products');
        return;
    }
    let fruits = await Product.find({category:'Fruit'});
    let vegetables = await Product.find({category:'Vegetable'});
    return response.render('home',{
        title:'Home | JAIVIK JAAYAKA',
        fruits:fruits,
        vegetables:vegetables,
    });
}