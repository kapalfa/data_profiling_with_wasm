const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./config/database");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const app = express();
require("./config/passport")(passport);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
//app.use(require("serve-static")(__dirname + "/../../public"));
app.use(express.static("public"));
app.use(require("cookie-parser")());
app.use(bodyParser.urlencoded({ extended: false }));

const authRouter = require("./routes/auth");
const mainRouter = require("./routes/main");
app.use("/", authRouter);
app.use("/main", mainRouter);

const initApp = async () => {
  console.log("Testing the database connection...");

  try {
    await db.authenticate();
    console.log("Connection has been established successfully");

    app.listen(3000, () => {
      console.log("Server is on port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};

initApp();
