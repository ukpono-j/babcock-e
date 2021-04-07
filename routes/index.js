const express = require("express");
const usersRoute = require("./users");
const booksRoute = require("./books");
const isLoggedIn = require("../middlewares/is-logged-in");

const router = express.Router();

router.use("/auth", usersRoute);
router.use("/books", isLoggedIn, booksRoute);

module.exports = router;
