const { Sequelize, Model, DataTypes } = require("sequelize");
const { sequelize } = require("../entity");

class Board extends Model {}

Board.init(
    {
        board_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.ENUM,
            values: ["announcement", "domestic", "foreign", "bitcoin"],
            allowNull: false,
        },
        hit: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        modelName: "Board",
    }
);

module.exports = {
    Board,
};
