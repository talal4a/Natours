const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
process.on("uncaughtException", (err) => {
  console.log(`UNHANDLED REJECTION! 💥 Shutting down .... `);
  console.log(err.name, err.message);
  process.exit(1);
});
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  decodeURIComponent(process.env.DATABASE_PASSWORD)
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
const app = require("./app");
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port on ${port}`);
});
process.on("unhandledRejection", (err) => {
  console.log(`UNHANDLED REJECTION! 💥 Shutting down .... `);
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
