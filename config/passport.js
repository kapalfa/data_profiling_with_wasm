const LocalStrategy = require("passport-local").Strategy;
const User = require("../sequelize/models/user");
const crypto = require("crypto");
require("dotenv").config();

module.exports = function (passport) {
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, {
        // id: user.id,
        //name: user.name,
        user,
      });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });

  passport.use(
    "local",
    new LocalStrategy(async function (username, password, cb) {
      try {
        let user = await User.findOne({ where: { name: username } });
        if (!user) {
          console.log("not found");
          return cb(null, false, {
            message: "Incorrect username or password.",
          });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              console.log(err);
              return cb(err);
            }
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return cb(null, false, {
                message: "Incorrect username or password.",
              });
            }
            console.log("authenticated");
            return cb(null, user);
          }
        );
      } catch (err) {
        return cb(err);
      }
    })
  );
};
