const Product = require('../../../models/product');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
const productImagePath = Product.productPath;
const env = require('../../../config/environment');
const AWS = require('aws-sdk');
const fs = require('fs');

// creating S3 Object here
const s3 = new AWS.S3({
  accessKeyId: env.aws.AWS_ID,
  secretAccessKey: env.aws.AWS_SECRET,
});

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
      message: 'Product Fetched Successfully',
    });
  } catch (err) {
    return response.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports.addProduct = async function (request, response) {
  try {
    // creating buffer for file
    const fileContent = fs.readFileSync(request.file.filename);
    console.log(request.file, fileContent);
    console.log(request.body);
    let params = {
      Bucket: env.aws.AWS_BUCKET_NAME,
      Key: request.file.filename,
      Body: fileContent,
    };
    let image = s3.upload(params, (error, data) => {
      if (error) {
        console.log('error');
        return response.status(401).json({
          success: false,
          message: 'Error in uploading file to server',
        });
      }
      console.log('data', data);
      return response
        .status(200)
        .json({ success: true, message: 'File Uplaoded successfully' });
    });
    // console.log('ww');
    // console.log(image);
    //   let sold_by = '';
    //   if (request.body.sold_by) {
    //     sold_by = request.body.sold_by;
    //   }
    //   //checking for empty creadentials
    //   if (
    //     request.body.title === undefined ||
    //     request.body.category === undefined ||
    //     request.body.marked_price === undefined ||
    //     request.body.selling_price === undefined ||
    //     request.body.stock_quantity === undefined
    //   ) {
    //     return response.status(402).json({
    //       success: false,
    //       message: 'Please fill all necessary credentials',
    //     });
    //   }
    //   console.log('path', productImagePath + '/' + request.file.filename);

    //   let product = await Product.create({
    //     title: request.body.title,
    //     category: request.body.category,
    //     marked_price: Number(request.body.marked_price),
    //     selling_price: Number(request.body.selling_price),
    //     sold_by: sold_by,
    //     stock_quantity: Number(request.body.stock_quantity),
    //     is_hidden: false,
    //     is_deletable: true,
    //     user: request.user.id,
    //     product_image: productImagePath + '/' + request.file.filename,
    //   });
    //   if (product) {
    //     return response.status(200).json({
    //       success: true,
    //       message: 'Product added successfully',
    //     });
    //   }
    //   return response.status(402).json({
    //     success: false,
    //     message: 'Invalid Product Credential please fill them carefully',
    //   });
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
        success: true,
        message: 'Product Received',
      },
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
