const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../sequelize/models/user");
const crypto = require("crypto");

require("../config/passport")(passport);

router.get("/", function (req, res) {
  res.render("login");
});

router.post(
  "/login", //function (req, res) {
  //passport.authenticate("local", function (user) {
  passport.authenticate("local", {
    //req.logIn(user, function (req, res) {
    //     console.log(req.body);
    //    console.log(req.session.passport.user);
    //    console.log(err);
    // if (err) {
    //return next(err);
    // console.log(err);
    //}
    //return res.redirect("/main");
    //});
    successRedirect: "/main",
    failureRedirect: "/",
    // failureFlash: true,
    // })(req, res);
  })
);
//});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async function (req, res, next) {
  const { name, password } = req.body;
  const user = await User.findOne({ where: { name: name } });
  if (user) {
    console.log(`User with same username already exists`);
    res.render("signup");
    return next(null, false, {
      message: "user with same username already exists.",
    });
  } else {
    const salt = crypto.randomBytes(16);
    const user = await User.create({
      name: name,
      password: crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256"),
      salt: salt,
    });
    if (user) {
      await user.save();
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        console.log(`User created successfully`);
        res.redirect("/main");
      });
    } else if (err) {
      console.error(`error in saving user ${err}`);
      return next(err);
    }
  }
});
module.exports = router;
