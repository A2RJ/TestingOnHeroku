"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // User.hasOne(models.Store, {
            //   foreignKey: "UserId",
            //   onDelete: "CASCADE",
            // });
            User.hasOne(models.Store);
            User.hasMany(models.Order);
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: { notEmpty: { msg: "name Must not be empty" } },
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "email Must not be empty" },
                    isEmail: { msg: "Email is not valid" },
                },
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "password Must not be empty" },
                    len: [6, 20],
                },
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    User.addHook("beforeCreate", "hash Password on register", (value) => {
        value.password = hashPassword(value.password);
        console.log(hashPassword(value.password));
    });

    return User;
};
