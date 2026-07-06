const express=require("express");
const requestRouter=express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../utils/validateSignUpData");
const { userAuth } = require("../middlewares/auth");


requestRouter.post('/sendConnectionRequest', userAuth, async (req, res) => {
  const user = req.user;
  //sending a connection request
  console.log("Sending connection request");
  res.send(user.firstName + "sent the connect request")
})



module.exports=requestRouter