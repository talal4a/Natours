const Tour = require('../model/tourModel');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverView = catchAsync(async (req, res, next) => {
  try {
    // 1) Get tour data from collection
    const tours = await Tour.find();

    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('overview', {
      title: 'All Tours',
      tours,
      user: res.locals.user || null,
    });
  } catch (err) {
    console.error('Error in getOverView:', err);

    // Fallback response if template rendering fails
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Natours | All Tours</title>
          <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
          <h1>Welcome to Natours</h1>
          <p>You are logged in as: ${res.locals.user ? res.locals.user.name : 'Guest'}</p>
          <p>There was an issue loading tours. Please try again later.</p>
          <a href="/">Return to Home</a>
        </body>
      </html>
    `);
  }
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user',
  });
  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    user: res.locals.user,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('login', {
    title: 'Login to your account',
    user: res.locals.user || null,
  });
});

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});
