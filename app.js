require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const FileStore = require("session-file-store")(expressSession);
const fileUpload = require("express-fileupload");
const passport = require("./handler/auth");
const PORT = process.env.PORT || 5000;

const app = express();
const fileStoreOptions = {};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(cookieParser());
const sessOption = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(fileStoreOptions),
};
app.use(expressSession(sessOption)); //will be set with secret form env
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "amado-master")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    limits: { fileSize: 900 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: path.resolve(__dirname, "uploads", "tmp"),
  })
);

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
