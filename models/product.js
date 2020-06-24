const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const PRODUCT_PATH = path.join('/uploads/products/product_image');

const productSchema = new mongoose.Schema(
    {
        product_name:
        {
            type:String,
            required: true,
        },
        category:
        {
            type:String,
            required:true,
        },
        price:
        {
            type:Number,
            required:true,
        },
        discount:
        {
            type:Number,
            required:true,
        },
        sold_by:
        {
            type:String,
        },
        stock_quantity:
        {
            type:Number,
            required:true,
        },
        is_hidden:
        {
            type:Boolean,
            required:true,
        },
        product_image:
        {
            type:String,
        },
    },{
        timestamps:true,
    }
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..' , PRODUCT_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static methods
productSchema.statics.uploadProductImage = multer({storage:storage}).single('product_image');
productSchema.statics.productPath = PRODUCT_PATH;

const Product = mongoose.model('Product',productSchema);
module.exports = Product;