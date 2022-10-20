const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

// router.get("/", (req, res) => {
//     console.log("Hello from the server router.js");
// })

//Add user
router.post("/register", async (req, res) => {
  const { name, email, mobile, description } = req.body;
  if (!name || !email || !mobile || !description) {
    return res.status(422).json({ error: "Please fill the field properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    console.log(userExist);
    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else {
      const user = new User({ name, email, mobile, description });
      await user.save();
      res.status(201).json(user);
      console.log(user);
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

//Get user
router.get("/getdata", async (req, res) => {
  try {
    const data = await User.find();
    console.log(data);
    res.status(201).json(data);
  } catch (err) {
    res.status(422).json(err);
  }
});

//Get user by id
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const user = await User.findById({ _id: id });
    console.log(user);
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

//Update user
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updatedUser);
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(422).json(err);
  }
});

//Delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await User.findByIdAndDelete({ _id: id });
    console.log(deleteUser);
    res.status(201).json(deleteUser);
  } catch (err) {}
});

module.exports = router;
