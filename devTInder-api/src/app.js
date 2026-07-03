console.log("starting backend");

const express = require("express");
const connectToMongoDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Sapna",
    lastName: "Adsul",
    emailId: "sapabaadsul@gmail.com",
    password: "Sapna@1234",
  };
  const user = new User(userObj);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving user:" + err.message);
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
