const User = require("../../../models/user");
const bcrypt = require("bcrypt");

module.exports.createUser = async function (request, response) {
  try {
    let requestEmail = request.body.email.toLowerCase();
    if (request.body.password != request.body.confirm_password) {
      return response.status(422).json({
        message: "Password not matched",
      });
    }
    let user = await User.findOne({
      $or: [{ email: request.body.email }, { phone: request.body.phone }],
    });

    if (!user) {
      let salt = 7;
      //encrypting password
      let passwordHash = await bcrypt.hash(request.body.password, salt);
      //creating user
      user = await User.create({
        email: requestEmail,
        password: passwordHash,
        name: request.body.name,
        phone: request.body.phone,
        is_admin: false,
        is_varified: false,
        is_password_available: true,
      });

      return response.status(200).json({
        message: "User Created Successfully",
      });
    } else {
      return response.status(422).json({
        message: "User Exist",
      });
    }
  } catch (err) {
    console.log(err);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.update = async function (request, response) {
  try {
    let user = await User.findByIdAndUpdate(request.user.id).populate();
    if (user && user.id == request.user.id) {
      let userExistByEmail = await User.findOne({
        email: request.body.email.toLowerCase(),
      });
      if (userExistByEmail && userExistByEmail.id !== user.id) {
        return response.status(422).json({
          message: "Email Already Exist",
        });
      }
      let userExistByPhone = await User.findOne({ phone: request.body.phone });
      if (userExistByPhone && userExistByPhone.id !== user.id) {
        return response.status(422).json({
          message: "Phone Number Already Exist",
        });
      }
      User.uploadAvatar(request, response, function (err) {
        if (err) {
          console.log("Error in multer");
        }
        if (request.user.email != request.body.email) {
          user.email = request.body.email;
        }
        user.name = request.body.name;
        user.phone = request.body.phone;
        user.address = request.body.address;
        user.city = request.body.city;
        user.pincode = request.body.pincode;
        if (request.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + request.file.filename;
        }
        user.save();
        return response.status(200).json({
          message: "User Updated Successfully",
        });
      });
    } else {
      return response.status(422).json({
        message: "Unauthorized User",
      });
    }
  } catch (err) {
    console.log(err);
    console.log(request);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.profile = function (request, response) {
  return response.status(200).json({
    data: {
      user_profile: request.user.toObject(),
    },
    message: "User Profile sent",
  });
};

module.exports.delete = function (request, response) {
  return response.status(200).json({
    success: true,
    message: "Delete Profile Working",
  });
};
