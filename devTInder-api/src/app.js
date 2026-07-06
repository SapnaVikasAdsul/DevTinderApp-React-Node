console.log("starting backend");

const express = require("express");
const connectToMongoDB = require("./config/database");

const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validateSignUpData");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
const cookieParser = require("cookie-parser")

app.use(express.json()); //middleware to convert json response
app.use(cookieParser())

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request")

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter)


// app.get("/user", async (req, res) => {
//   const email = req.body.emailId;
//   try {
//     const user = await User.findOne({ emailId: email });
//     if (!user) {
//       res.status(400).send("User not found!!");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });
// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(400).send("failed to delete");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;

//   try {
//     const AllowedUpdates = ["firstName", "skills", "age", "photoUrl", "password", "about"];
//     const data = req.body;

//     console.log(data);
//     const isAllwedUpdates = Object.keys(data).every((k) => AllowedUpdates.includes(k));
//     console.log(isAllwedUpdates);
//     if (!isAllwedUpdates) {
//       throw new Error("update not allowed");
//     }
//     if (data?.skills.length > 5) {
//       throw new Error("Skills cannot be more than 5.");
//     }
//     // Hash password if being updated
//     if (data.password) {
//       data.password = await hashPassword(data.password);
//     }
//     const user = await User.findByIdAndUpdate(userId, data, { new: true });
//     res.send("user updated successfully");
//   } catch (err) {
//     res.status(400).send("something went wrong");
//   }
// });

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
