const Product = require("../../../models/product");

module.exports.getProducts = async function (request, response) {
  try {
    let fruits = await Product.find({ category: "Fruit" });
    console.log(fruits);
    let vegetables = await Product.find({ category: "Vegetable" });
    console.log(vegetables);
    let finalVegetable = vegetables.map((vegetable) => vegetable.toObject());
    let finalFruits = fruits.map((fruit) => fruit.toObject());
    return response.status(200).json({
      data: {
        fruits: finalFruits,
        vegetables: finalVegetable,
      },
      message: "Product Fetched Successfully",
    });
  } catch (err) {
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.addProduct = async function (request, response) {
  try {
    let sold_by = "";
    if (request.body.sold_by) {
      sold_by = request.body.sold_by;
    }
    //checking for empty creadentials
    if (
      request.body.product_name === undefined ||
      request.body.category === undefined ||
      request.body.marked_price === undefined ||
      request.body.selling_price === undefined ||
      request.body.stock_quantity === undefined
    ) {
      return response.status(402).json({
        success: false,
        message: "Please fill all necessary credentials",
      });
    }
    let product = await Product.create({
      product_name: request.body.product_name,
      category: request.body.category,
      marked_price: Number(request.body.marked_price),
      selling_price: Number(request.body.selling_price),
      sold_by: sold_by,
      stock_quantity: Number(request.body.stock_quantity),
      is_hidden: false,
      is_deletable: true,
      user: request.user.id,
    });
    if (product) {
      return response.status(200).json({
        success: true,
        message: "Product added successfully",
      });
    }
    return response.status(402).json({
      success: false,
      message: "Invalid Product Credential please fill them carefully",
    });
  } catch (err) {
    console.log("err", err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.deleteProduct = async function (request, response) {
  try {
    let product = await Product.findById(request.body.product_id);
    if (!product.is_deletable) {
      return response.status(402).json({
        success: false,
        message: "Product cannot be deleted",
      });
    }
    await Product.deleteOne({ _id: product._id });
    return response.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.log("error h", err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.productDetail = async function (request, response) {
  try {
    let product = await Product.findById(request.params.product_id).populate();
    if (!product) {
      return response.status(402).json({
        success: false,
        message: "Product not found",
      });
    }
    return response.status(200).json({
      data: {
        product: product.toObject(),
        success: true,
        message: "Product Received",
      },
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
