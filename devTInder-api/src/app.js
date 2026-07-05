console.log("starting backend");

const express = require("express");
const connectToMongoDB = require("./config/database");
const bcrypt = require("bcrypt");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validateSignUpData");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser")

app.use(express.json()); //middleware to convert json response
app.use(cookieParser())
app.post("/signup", async (req, res) => {
  //     const userObj = {
  //     firstName: "Sapna",
  //     lastName: "Adsul",
  //     emailId: "sapabaadsul@gmail.com",
  //     password: "Sapna@1234",
  //   };
  //   creating s new instance of the user model
  //  const user = new User(userObj);

  try {
    //validation of data
    validateSignUpData(req);

    const { password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    const userObj = { ...req.body, password: passwordHash };
    const user = new User(userObj);
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving user:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  const user = await User.findOne({ emailId: emailId });
  console.log(user);
  if (!user) {
    throw new Error("email id not exists");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    //Create a JWT token
    const token = await jwt.sign({ _id: user._id }, "DEV@tinder48598");
  
    res.cookie("token", token);

    res.send("Login successful!");
  } else {
    res.send("Password incorrect");
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user
    res.send(user);
  } catch (err) {
    res.status(400).send("SOmething went wrong");
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: email });
    if (!user) {
      res.status(400).send("User not found!!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("failed to delete");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;

  try {
    const AllowedUpdates = ["firstName", "skills", "age", "photoUrl", "password", "about"];
    const data = req.body;

    console.log(data);
    const isAllwedUpdates = Object.keys(data).every((k) => AllowedUpdates.includes(k));
    console.log(isAllwedUpdates);
    if (!isAllwedUpdates) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 5) {
      throw new Error("Skills cannot be more than 5.");
    }
    // Hash password if being updated
    if (data.password) {
      data.password = await hashPassword(data.password);
    }
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

connectToMongoDB()
  .then(() => {
    console.log("database connection established");

    app.listen(3000, () => {
      console.log("running on 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
