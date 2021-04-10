const router = require("express").Router();
const auth = require("../controllers/auth");

router.get("/logout", auth.logout);

// Register page
router.post("/register", auth.register);

// Login page
router.post("/login", auth.login);

module.exports = router;
