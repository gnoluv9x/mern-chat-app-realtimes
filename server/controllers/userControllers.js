const User = require("../models/userModels");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const hasUsernameExist = await User.findOne({ username }).lean();
    const hasEmailExist = await User.findOne({ email }).lean();
    if (hasUsernameExist) {
      return res.status(201).json({ status: false, msg: "User has exists" });
    } else if (hasEmailExist) {
      return res.status(201).json({ status: false, msg: "Email has exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPass,
    });
    user.password = undefined;
    return res.status(200).json({
      status: true,
      msg: "User has been created",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// login controller
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(203).json({ status: false, msg: "User is not correct" });
    }
    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (!isPasswordvalid) {
      return res.status(203).json({ status: false, msg: "Password is not correct" });
    }
    user.password = undefined;
    return res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// set avatar controller
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userid = req.params.id;
    console.log("userid :", userid);
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userid, {
      isAvatarImageSet: true,
      avatarImage,
    });

    return res.status(200).json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
  } catch (error) {
    next(error);
  }
};

// get all user controller
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
      "avatarImage",
    ]);

    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
