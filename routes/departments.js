const router = require("express").Router();
const path = require("path")
const booksRoute = require("./books");
const Books = require("../models/books");

router.use("/books", booksRoute);

router.get("/", async(req, res)=>{
  const book = await Book.find();
  res.render("department")
})

router.get("/:department/", function(req, res) {
  res.render("department")
})

module.exports = router;
