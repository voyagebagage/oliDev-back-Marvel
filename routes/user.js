const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../model/User");

router.post("/user/create", async (req, res) => {
  try {
    const { username, email, password } = req.fields;
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);
    const isExistingUserEmail = await User.findOne({ email: email });

    if (isExistingUserEmail) {
      res.status(400).json({ error: "This email already used " });
    } else {
      const isExistingUsername = await User.findOne({ username: username });

      if (!isExistingUsername) {
        if (username && email && password) {
          const newUser = new User({
            username: username,
            email: email,
            password: password,
            hash: hash,
            salt: salt,
            token: token,
          });
          await newUser.save();
          res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            token: token,
          });
        } else {
          res.status(400).json({ error: "Missing field(s)" });
        }
      } else {
        res.status(400).json({ error: "This username already used " });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/find", async (req, res) => {
  try {
    console.log("coucou");

    const { username, email, password } = req.fields;
    const inUserEmail = await User.findOne({ email: email });
    const inUserUsername = await User.findOne({
      username: username,
    });
    // console.log(inUserEmail);

    if ((username && password) || (email && password)) {
      if (inUserEmail || inUserUsername) {
        const inUser = inUserEmail || inUserUsername;
        console.log(inUser);
        const newHash = SHA256(password + inUser.salt).toString(encBase64);
        console.log(newHash);
        if (inUser.hash === newHash) {
          res.status(200).json({
            _id: inUser._id,
            token: inUser.token,
            username: inUser.username,
          });
        } else {
          res.status(402).json({ message: "Password incorrect" });
        }
      } else {
        res.status(402).json({ message: "Could not find the user or email" });
      }
    } else {
      res.status(400).json({ message: "Fields must be completed " });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
