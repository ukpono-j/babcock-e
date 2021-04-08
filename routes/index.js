const express = require("express");
const usersRoute = require("./users");
const departmentRoute = require("./departments");
const isLoggedIn = require("../middlewares/is-logged-in");

const router = express.Router();

router.use("/auth", usersRoute);
router.use("/department", isLoggedIn, departmentRoute);

module.exports = router;
