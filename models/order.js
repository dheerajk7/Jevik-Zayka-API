const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order_id: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        marked_price: {
          type: Number,
          required: true,
        },
        selling_price: {
          type: Number,
          required: true,
        },
        sold_by: {
          type: String,
        },
      },
    ],
    total_amount: {
      type: Number,
      required: true,
    },
    payment_mode: {
      type: String,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
    },
    billing_status: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    mobile_number: {
      type: Number,
      required: true,
    },
    shipping_cost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

if (!orderSchema.options.toObject) orderSchema.options.toObject = {};

//customizing order's object
orderSchema.options.toObject.transform = function (doc, order, options) {
  delete order.__v;
  return order;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
