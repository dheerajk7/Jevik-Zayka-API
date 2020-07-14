const Product = require("../../../models/product");

module.exports.getProducts = async function (request, response) {
  try {
    let fruits = await Product.find({ category: "Fruit" });
    let vegetables = await Product.find({ category: "Vegetable" });

    return response.status(200).json({
      data: {
        fruits: fruits,
        vegetables: vegetables,
      },
      message: "Product Fetched Successfully",
    });
  } catch (err) {
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.addProduct = function (request, response) {
  return response.status(200).json({
    success: true,
    message: "Add Product working",
  });
};

module.exports.deleteProduct = function (request, response) {
  return response.status(200).json({
    params: request.params,
    success: true,
    message: "Delete Product working",
  });
};

module.exports.productDetail = function (request, response) {
  return response.status(200).json({
    success: true,
    message: "Product Detail working",
  });
};
