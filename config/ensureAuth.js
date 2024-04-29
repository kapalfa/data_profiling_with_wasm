const path = require("path");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).render("login.ejs");
}
module.exports = ensureAuthenticated;
