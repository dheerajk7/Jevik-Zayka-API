const Product = require('../../../models/product');
var multer = require('multer');
const fs = require('fs');
const singleUpload = require('../../../services/product-image-upload').single(
  'product_image'
);

module.exports.getProducts = async function (request, response) {
  try {
    let fruits = await Product.find();
    let vegetables = await Product.find({ category: 'Vegetable' });
    let finalVegetable = vegetables.map((vegetable) => vegetable.toObject());
    let finalFruits = fruits.map((fruit) => fruit.toObject());
    return response.status(200).json({
      data: {
        fruits: finalFruits,
        vegetables: finalVegetable,
      },
      success: true,
      message: 'Product Fetched Successfully',
    });
  } catch (err) {
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.addProduct = async function (request, response) {
  try {
    singleUpload(request, response, function (err) {
      if (err) {
        console.log('error h');
        return response.status(422).json({
          success: false,
          message: 'Invalid File type only JPEG, JPG and PNG are acceptable',
        });
      }
      if (request.file === undefined) {
        return response.status(422).json({
          success: false,
          messsage: 'Upload Product Image',
        });
      }

      let sold_by = '';
      if (request.body.sold_by) {
        sold_by = request.body.sold_by;
      }
      //checking for empty creadentials
      if (
        request.body.title === undefined ||
        request.body.category === undefined ||
        request.body.marked_price === undefined ||
        request.body.selling_price === undefined ||
        request.body.stock_quantity === undefined
      ) {
        return response.status(402).json({
          success: false,
          message: 'Please fill all necessary credentials',
        });
      }

      Product.create(
        {
          title: request.body.title,
          category: request.body.category,
          marked_price: Number(request.body.marked_price),
          selling_price: Number(request.body.selling_price),
          sold_by: sold_by,
          stock_quantity: Number(request.body.stock_quantity),
          is_hidden: false,
          is_deletable: true,
          user: request.user.id,
          product_image: request.file.location,
        },
        function (err, product) {
          if (err) {
            return response
              .status(422)
              .json({ success: false, message: 'Error in adding new product' });
          }
          return response.status(200).json({
            success: true,
            message: 'Product Added Successfully',
          });
        }
      );
    });
  } catch (err) {
    console.log('err', err);
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.deleteProduct = async function (request, response) {
  try {
    let product = await Product.findById(request.body.product_id);
    if (!product.is_deletable) {
      return response.status(402).json({
        success: false,
        message: 'Product cannot be deleted',
      });
    }
    await Product.deleteOne({ _id: product._id });
    return response.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err) {
    console.log('error h', err);
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports.productDetail = async function (request, response) {
  try {
    let product = await Product.findById(request.params.product_id).populate();
    if (!product) {
      return response.status(402).json({
        success: false,
        message: 'Product not found',
      });
    }
    return response.status(200).json({
      data: {
        product: product.toObject(),
      },
      success: true,
      message: 'Product Received',
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
