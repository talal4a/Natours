const User = require("../model/userModal");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates.Please /updateMypassword.",
        400
      )
    );
  }
  const filtered = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filtered, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "sucess",
    data: {
      updatedUser,
    },
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined!Please use signup instead!",
  });
};
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
