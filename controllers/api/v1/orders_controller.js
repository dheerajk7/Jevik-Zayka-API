const Order = require("../../../models/order");
const Product = require("../../../models/product");
const User = require("../../../models/user");

async function updatingProductDeletableStatus(productDetail) {
  let product = await Product.findByIdAndUpdate(productDetail.product_id);
  if (product) {
    product.is_deletable = false;
    product.save();
  }
  return;
}

module.exports.createOrder = async function (request, response) {
  try {
    let user = await User.findByIdAndUpdate(request.user._id);
    let order = await Order.create({
      user: request.user._id,
      order_id: Date.now(),
      products: request.body.data.products,
      total_amount: request.body.data.total_amount,
      payment_mode: request.body.data.payment_mode,
      order_status: "Pending",
      billing_status: request.body.data.billing_status,
      address: request.body.data.address,
      city: request.body.data.city,
      pincode: request.body.data.pincode,
      mobile_number: request.body.data.mobile_number,
      shipping_cost: request.body.data.shipping_cost,
    });
    if (order) {
      for (let product of request.body.data.products) {
        if (product.is_deletable == true) {
          await updatingProductDeletableStatus(product);
        }
      }
    }
    if (order) {
      user.orders.push(order._id);
      user.save();
    }
    return response.status(200).json({
      data: {
        order_id: order.order_id,
      },
      success: true,
      message: "Order Created  Successfully",
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.deleteOrder = function (request, response) {
  // let order = await Order.findById
};

module.exports.getAllOrder = async function (request, response) {
  try {
    let orders = await Order.find({ user: request.user._id })
      .populate("user", "name phone email")
      .sort("-createdAt");
    return response.status(200).json({
      data: orders,
      success: true,
      message: "Order received successfully",
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.orderDetail = async function (request, response) {
  try {
    let order = await Order.findOne({
      order_id: request.params.order_id,
    }).populate("user", "name email phone");
    //if order id doesn't belongs to login user
    if (!order || request.user.id !== order.user.id) {
      return response.status(402).json({
        success: false,
        messsage: "Order not found",
      });
    }
    return response.status(200).json({
      order: order,
      success: true,
      message: "Order Detail working",
    });
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
