require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./db/conn");
const User = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

const app = express();

const port = 8003;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});