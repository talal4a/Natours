const User = require("../model/userModal");
const catchAsync = require("../utils/catchAsync");
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: "sucess",
    data: {
      user: newUser,
    },
  });
});
