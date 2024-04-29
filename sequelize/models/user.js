const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
//const crypto = require("crypto");

const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, unique: true },
  password: DataTypes.BLOB,
  salt: DataTypes.BLOB,
});

(async () => {
  await sequelize.sync();
})();

// async function populateUser() {
//   const salt = crypto.randomBytes(16);

//   const userExists = await User.findOne({
//     where: { name: "adm1n" },
//   });

//   if (!userExists) {
//     const sample = await User.create({
//       name: "adm1n",
//       password: crypto.pbkdf2Sync("ufo", salt, 310000, 32, "sha256"),
//       salt: salt,
//     });
//     await sample.save();
//   }
// }

// //populateUser();

module.exports = User;
