const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const Tour = require('../../../model/tourModel');
const User = require('../../../model/userModel');
const Reviews = require('../../../model/reviewModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);
const importData = async () => {
  try {
    await Tour.create(tours);

    // Add confirmPassword to each user
    const usersWithConfirmPassword = users.map((user) => {
      // Create a new object with all existing properties
      const newUser = { ...user };
      // Add confirmPassword equal to password
      newUser.confirmPassword = user.password;
      return newUser;
    });

    // Use the modified users array
    await User.create(usersWithConfirmPassword, { validateBeforeSave: false });

    await Reviews.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error('Error loading data:', err);
  }
  process.exit();
};
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Reviews.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error('Error deleting data:', err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
