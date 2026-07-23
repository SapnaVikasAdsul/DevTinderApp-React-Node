const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validateSignUpData");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user
        res.send(user);
    } catch (err) {
        res.status(400).send("SOmething went wrong");
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("invalid edit request")

        }
        const user = req.user;

        Object.keys(req.body).forEach((key) => {
            user[key] = req.body[key];
        });
        await user.save()
        res.send("user updated successfully");
    }
    catch (err) {
        res.status(400).send("errrr" + err)
    }
})






module.exports = profileRouter