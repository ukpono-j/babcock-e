module.exports = function (sequelize, DataType) {
  const Book = sequelize.define(
    "book",
    {
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
        unique: true,
      },
      author: {
        type: DataType.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeValidate: function (input) {
          if (input.name) {
            input.name = input.name.toLowerCase().trim();
          }
        },
      },
    }
  );

  return Book;
};
