const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const port = 5000 || process.env.port;
const UserRoute = require("./routes/UserRoute");
const TemplateRoute = require("./routes/TemplateRoute");

const DB_LINK = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qa4ik.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(DB_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to Database");
});

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use(UserRoute);
app.use(TemplateRoute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
