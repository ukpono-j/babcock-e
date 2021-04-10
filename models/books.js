module.exports = function (sequelize, DataType) {
  const Book = sequelize.define(
    "book",
    {
      name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
      author: {
        type: DataType.STRING,
        allowNull: false,
      },
      filename: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      hooks: {
        beforeValidate: function (input) {
          if (input.name) {
            input.name = input.name.toLowerCase().trim();
          }

          if (input.author) {
            input.author = input.author.toLowerCase().trim();
          }
        },
      },
    }
  );

  return Book;
};
