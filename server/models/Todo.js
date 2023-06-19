const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define(
      "Todo",
      {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          content: {
            type: DataTypes.STRING(30),
            allowNull: false,
          },
          createAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          updateAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          isCompleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          }
      },
      {
        timestamps: false,
      }
    );
    return Todo;
  };