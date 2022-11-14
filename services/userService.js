const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const sendEmail = require("../confirmEmail/sendEmail");
const { createTryAndCatch } = require("../utils/catchErrors");
module.exports.signup = createTryAndCatch(async (req, res) => {
  const { name, email, password, age } = req.body;
  const user = await userModel.find({ email });
  if (user.length > 0) {
    res.json({ message: " email already exits" });
  } else {
    bcrypt.hash(password, 5, async function (err, hash) {
      const userNew = await userModel.insertMany({
        name,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "salah");
      let message = `<a href="http://localhost:9000/user/verify/${token}">follow to active account </a>`;
       sendEmail.sendEmailFromUser({ email, message });
      res.json({ message: "success", userNew });
    });
  }
})
module.exports.signin = createTryAndCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    const match = await bcrypt.compare(password, user.password);
    var token = jwt.sign(
      { userId: user._id, name: user.name, emailConfirm: user.emailConfirm },
      process.env.SECRETTOKEN
    );

    if (match) {
      if (user.emailConfirm == true) {
        res.json({ message: "success", token });
      } else {
        res.json({
          message:
            "please chick your account To activate your account on Saraha",
        });
      }
    } else {
      res.json({ message: "password is incorrect" });
    }
  } else {
    res.json({ message: "email not found" });
  }
})
module.exports.conFirmEmail = createTryAndCatch((req, res) => {
  const { token } = req.params;
  jwt.verify(token, "salah", async (err, decoded) => {
    if (err) {
      res.json({ err });
    } else {
      let user = await userModel.findOne({ email: decoded.email });
      if (user) {
        await userModel.findOneAndUpdate(
          { email: decoded.email },
          { emailConfirm: true }
        );
        res.json({ message: "verified" });
      } else {
        res.json({ message: "email not found" });
      }
    }
  });
})
module.exports.changePassword = createTryAndCatch(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await userModel.findById({ _id: req.id });
  if (oldPassword != newPassword) {
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      res.json({ message: "invalid-password" });
    } else {
      const hashPassword = await bcrypt.hash(
        newPassword,
        Number(process.env.SALT)
      );
      const pass = await userModel.findByIdAndUpdate(
        { _id: req.id },
        { password: hashPassword }
      );
      res.json({ message: "success", pass });
    }
  } else {
    res.json({ message: "please write correct password" });
  }
})
module.exports.changeName = createTryAndCatch(async (req, res) => {
  const { name } = req.body;
  const user = await userModel.findById({ _id: req.id });
  if (user) {
   const userNew =   await userModel.findByIdAndUpdate({ _id: req.id }, { name } , {new:true});
    res.json({ message: "success", userNew });
  } else {
    res.json({ message: "user not found" });
  }
})
