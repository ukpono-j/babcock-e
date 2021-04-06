const express = require("express");
const usersRoute = require("./users");

const router = express.Router();

router.use("/auth", usersRoute);

router.post("/files/:department", (req, res) => {
  // find the department
  // upload file
  // and link to books Model and run association
});

router.get("/files/:fileName", (req, res) => {
  // find the fileName
  // pipe file stream to response
});
module.exports = router;
