"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Store.hasMany(models.Product, {
            //   foreignKey: "StoreId",
            //   onDelete: "CASCADE",
            // });
            // Store.hasOne(models.User, {
            //   foreignKey: "StoreId",
            //   onDelete: "CASCADE",
            // });
            Store.hasMany(models.Product);
            Store.belongsTo(models.User, {
                onDelete: "CASCADE",
            });
        }
    }
    Store.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: { notEmpty: { msg: "name Must not be empty" } },
            },
            contact: {
                type: DataTypes.STRING,
                validate: { notEmpty: { msg: "contact Must not be empty" } },
            },
            address: {
                type: DataTypes.STRING,
                validate: { notEmpty: { msg: "address Must not be empty" } },
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "description Must not be empty" },
                },
            },
            imgUrl: {
                type: DataTypes.STRING,
                validate: { notEmpty: { msg: "imgUrl Must not be empty" } },
            },
            UserId: {
                type: DataTypes.INTEGER,
                validate: { notEmpty: { msg: "UserId Must not be empty" } },
            },
        },
        {
            sequelize,
            modelName: "Store",
        }
    );
    return Store;
};
