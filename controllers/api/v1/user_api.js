const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.createUser = async function (request, response) {
  try {
    let requestEmail = request.body.email.toLowerCase();
    if (request.body.password != request.body.confirm_password) {
      return response.status(422).json({
        message: "Password not matched",
      });
    }
    let userByEmail = await User.findOne({ email: requestEmail });
    let userByPhone = await User.findOne({ phone: request.body.phone });
    if (!userByEmail && !userByPhone) {
      user = await User.create({
        email: requestEmail,
        password: request.body.password,
        name: request.body.name,
        phone: request.body.phone,
        isAdmin: false,
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
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.createSession = async function (request, response) {
  try {
    let user = await User.findOne({ email: request.body.email });
    if (!user) {
      return response.status(402).json({
        success: false,
        message: "Please Register Account not exist with these number",
      });
    }

    //compairing encrypted password with the input password
    bcrypt.compare(request.body.password, user.password, function (
      err,
      result
    ) {
      //if password doesn't matched
      if (result != true) {
        return response.status(402).json({
          success: false,
          message: "Invalid username or password",
        });
      }
      //if password matched returning user and token
      return response.status(200).json({
        data: {
          token: jwt.sign(user.toJSON(), "jaivik-jaayaka", {
            expiresIn: 100000,
          }),
        },
        message: "Sign In successful,here is your token, keep it safe",
        success: true,
      });
    });
  } catch (err) {
    console.log("error", err);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.userProfile = function (request, response) {
  return response.status(200).json({
    data: {
      user_profile: request.user.toObject(),
    },
    message: "User Profile sent",
  });
};
