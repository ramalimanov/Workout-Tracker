const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");



const PORT = process.env.PORT || 8080;
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://user:Testing_1@ds233268.mlab.com:33268/heroku_07qjqn81", { useNewUrlParser: true });

app.use(require("./routes/api"));
app.use(require("./routes/html"));

//test
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});