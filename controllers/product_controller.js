const Product = require('../models/product');
const path = require('path');
const fs = require('fs');

module.exports.home = function(request,response)
{
    return response.redirect('/');
}

module.exports.addProduct = function(request,response)
{
    return response.render('add-product',{title:'Add Product | JAIVIK JAAYAKA'});
}

module.exports.createProduct = async function(request,response)
{
    try
    {
        Product.uploadProductImage(request,response,function(err)
            {
                if(err){
                    console.log('Error in multer',err);
                    return;
                };
                let promise = new Promise((resolve,reject) => {
                    let product = Product.create(
                        {
                            product_name:request.body.product_name,
                            category:request.body.category,
                            price:request.body.price,
                            discount:request.body.discount,
                            sold_by:request.body.sold_by,
                            stock_quantity:request.body.stock_quantity,
                            is_hidden:false,
                        });
                    resolve(product);
                });
                
                promise.then((product) => {
                    if(request.file)
                    {
                        if(product.product_image)
                        {
                            fs.unlinkSync(path.join(__dirname,'..',product.product_image));
                        }
                        product.product_image = Product.productPath + '/' + request.file.filename;
                    }
                    product.save();
                });
                return response.redirect('/product');
            });
    }
    catch(err)
    {
        console.log('Error in adding Product',err);
        return;
    }
}