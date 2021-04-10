const router = require("express").Router();
const path = require("path")
const booksRoute = require("./books");
const homeLoad = require("../controllers/home-load");
const { Book, Department, Sequelize } = require("../models/index");

router.use("/books", booksRoute);

router.get("/", homeLoad);

router.use(require("express").static(path.join(__dirname, "..", "public")));

router.get("/:department/", async function (req, res) {
  const books = await Book.findAll({
    include: {
      model: Department,
      where: {
        name: { [Sequelize.Op.eq]: req.params.department.toLowerCase() }
      }
    }
  });
  const jsonBooks = books.map(bk=>bk.toJSON())
  res.render("departments", {books: jsonBooks})
  // console.log(jsonBooks, req.params.department.toLowerCase());
})

module.exports = router;
