const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
console.log("PORT:", process.env.PORT);
console.log("USER:", process.env.USER);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
