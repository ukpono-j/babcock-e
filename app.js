require("dotenv").config();
const {promises: fsPromise} = require("fs");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const expressSession = require("express-session");
const FileStore = require("session-file-store")(expressSession);
const fileUpload = require("express-fileupload");
const goodStatus = require("good-status");
const passport = require("./handlers/auth");
const router = require("./routes/index");
const db = require("./models/index");
const PORT = process.env.PORT || 5000;

const app = express();
const fileStoreOptions = {};
const sessOption = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new FileStore(fileStoreOptions),
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(goodStatus({
  send: false
}));
app.use(cookieParser());
app.use(expressSession(sessOption));
//will be set with secret form env
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(fileUpload({
  limits: {
    fileSize: 900 * 1024 * 1024
  },
  useTempFiles: true,
  tempFileDir: path.resolve(__dirname, "uploads", "tmp"),
}));

app.use("/", router);

// console.log(global);
db.sequelize.sync().then(async()=>{
  let filesPath = path.resolve(__dirname, "uploads");

  async function findOrCreateUploadDir(dirPath) {
    try {
      const descp = await fsPromise.open(dirPath, "r");
      await descp.close();
    } catch (err) {
      if (err.code === "ENOENT") {
        return await fsPromise.mkdir(dirPath);
      }
    }
  }

  await findOrCreateUploadDir(filesPath);

  //   create departments
  const depts = ["COMPUTING AND ENGINEERING", "BENJAMIN CARSON SCHOOL OF MEDICINE", "EDUCATION AND HUMANITIES", "LAW AND SECURITY STUDIES", "MANAGEMENT SCIENCES", "SCHOOL OF NURSING SCIENCES", "PUBLIC AND ALLIED HEALTH", "SCIENCE AND TECHNOLOGY", "VERONICA ADELEKE SCHOOL OF SOCIAL SCIENCES"]
  await db.Department.bulkCreate(depts.map(e=>({
    name: e.toLowerCase()
  }))).catch(err=>{}
  );

  app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
  });
}
);
