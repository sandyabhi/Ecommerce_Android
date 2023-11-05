const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const nodemailer = require("nodemailer");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());

dotenv.config();
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//------------------------------------------

app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);

//------------------------------------------

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
