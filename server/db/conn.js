const mongoose = require("mongoose");

const DB =
  "mongodb+srv://Aishwary:Rishi%409799232498@cluster0.yyhc0qc.mongodb.net/Contact_Management?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));
