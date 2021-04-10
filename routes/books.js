const router = require("express").Router();
const books = require("../controllers/books");

router
  .post("/upload", books.create)
  // .get("/:department", books.getOne)
  .get("/:bookName", books.getBook)
  .get("/:bookName/cover", books.getCover);

module.exports = router;
