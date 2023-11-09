const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../entity");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        provider: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "local",
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);

module.exports = {
    User,
};
