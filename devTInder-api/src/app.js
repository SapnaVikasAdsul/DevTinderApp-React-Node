console.log("starting backend");

const express = require("express");
const connectToMongoDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); //middleware to convert json response

app.post("/signup", async (req, res) => {
  //     const userObj = {
  //     firstName: "Sapna",
  //     lastName: "Adsul",
  //     emailId: "sapabaadsul@gmail.com",
  //     password: "Sapna@1234",
  //   };
  //   creating s new instance of the user model
  //  const user = new User(userObj);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving user:" + err.message);
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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.put("/user",async(req,res)=>{
    
})
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
