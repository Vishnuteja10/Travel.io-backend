const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const connectDB = require("./config/dbconfig");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

connectDB();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("hello geeks!");
});

mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(process.env.PORT, () => {
    console.log("server is up and running");
  });
});

const hotelDataAddedToDB = require("./routes/dataimport.route");
app.use("/api", hotelDataAddedToDB);

const categoryDataAddedToDB = require("./routes/categoryimport.router");
app.use("/api", categoryDataAddedToDB);

const hotels = require("./routes/hotel.router");
app.use("/api", hotels);

const categories = require("./routes/category.router");
app.use("/api", categories);

const authRouter = require("./routes/auth");
app.use("/api", authRouter);

const wishlistRouter = require("./routes/wishlist.router");
app.use("/api", wishlistRouter);
