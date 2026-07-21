const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
const User = require("../models/user")
const cookieParser = require("cookie-parser")
const userAuth = async (req, res, next) => {
   try {
      const { token } = req.cookies;
      if (!token) {
         return res.status(401).send("please login!")
      }
      const decodeObj = await jwt.verify(token, "DEV@tinder48598") //token + secret key
      const { _id } = decodeObj
      console.log(_id)
      const user = await User.findById(_id);
      console.log("from auth" + user)
      if (!user) {
         throw new Error("User not found")
      }
      req.user = user
      next();//to move to next request handler
   }
   catch (err) {
      res.status(400).send("error: " + err.message)
   }

}

module.exports = { userAuth }