const router = require("express").Router();
const books = require("../controllers/books");

router
  .post("/:department/upload", books.create)
  .get("/:department", books.getOne)
  .get("/:bookName", books.getOne);

module.exports = router;
