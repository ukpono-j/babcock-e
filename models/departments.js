module.exports = function (sequelize, DataType) {
  const Department = sequelize.define(
    "department",
    {
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
        unique: true,
      },
    },
    {
      hooks: {
        beforeValidate: function (input) {
          input.name = input.name.toLowerCase().trim();
        },
      },
    }
  );

  return Department;
};
