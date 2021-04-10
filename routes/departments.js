const router = require("express").Router();
const path = require("path")
const booksRoute = require("./books");
const {Book} = require("../models/index");

router.use("/books", booksRoute);

router.get("/", async(req, res)=>{
  const book = await Book.findAll();
  res.render("department", {books: book})
})

router.get("/:department/", function(req, res) {
//   const book = await Book.findAll({where: {department:}});
  res.render("department")
})

module.exports = router;
