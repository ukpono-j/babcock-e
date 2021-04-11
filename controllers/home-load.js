const { Book, Department } = require("../models/index");

module.exports = (page)=>async (req, res) => {
  const books = await Book.findAll({
    include: {
      model: Department,
    },
    limit: 6
  });
  const jsonBooks = books.map((bk) => bk.toJSON());
  res.render(page, { books: jsonBooks });
};
