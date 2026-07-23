const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validateSignUpData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    console.log(user);
    if (!user) {
        res.status(401).send("Invalid credentials")
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        //Create a JWT token
        const token = await jwt.sign({ _id: user._id }, "DEV@tinder48598", { expiresIn: "1d" });
        //Add the token in cookey and send response to user
        res.cookie("token", token);

        res.send(user);
    } else {
        res.send("Password incorrect");
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.send("logged out")
})



module.exports = authRouter