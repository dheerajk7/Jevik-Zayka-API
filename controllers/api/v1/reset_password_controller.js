module.exports.resetMail = function (request, response) {
  return response.status(200).json({
    success: true,
    message: "Reset Mail working",
  });
};

module.exports.savePassword = function (request, response) {
  return response.status(200).json({
    success: true,
    message: "Save Password working",
  });
};
