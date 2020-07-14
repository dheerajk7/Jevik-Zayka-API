module.exports.createOrder = function (request, response) {
  return response.status(200).json({
    success: true,
    message: "Create Order working",
  });
};

module.exports.deleteOrder = function (request, response) {
  return response.status(200).json({
    params: request.params,
    success: true,
    message: "Delete Order working",
  });
};

module.exports.getAllOrder = function (request, response) {
  return response.status(200).json({
    success: true,
    message: "Get All order working",
  });
};

module.exports.orderDetail = function (request, response) {
  return response.status(200).json({
    params: request.params,
    success: true,
    message: "Order Detail working",
  });
};
