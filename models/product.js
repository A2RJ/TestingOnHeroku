"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.belongsTo(models.User, {
      //   foreignKey: 'UserId',
      //   onDelete: 'CASCADE'
      // });
      // Product.hasMany(models.Order, {
      //   foreignKey: 'ProductId',
      //   onDelete: 'CASCADE'
      // });
      Product.belongsTo(models.Category);
      Product.belongsTo(models.Store, {
        onDelete: "CASCADE",
      });
      // Product.belongsTo(models.Order);
    }

    get price() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",

        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(this.price);
    }

    static validator(product) {
      return new Promise((resolve, reject) => {
        const errors = [];
        if (!product.name) {
          errors.push("Name is required");
        }
        if (!product.price) {
          errors.push("Price is required");
        }
        if (!product.imgUrl) {
          errors.push("Image URL is required");
        }
        if (!product.description) {
          errors.push("Description is required");
        }
        if (!product.stock) {
          errors.push("Stock is required");
        }
        if (!product.CategoryId) {
          errors.push("Category is required");
        }

        if (errors.length > 0) {
          reject(errors);
        } else {
          resolve({
            name: product.name,
            price: product.price,
            imgUrl: product.imgUrl,
            description: product.description,
            stock: product.stock,
            CategoryId: product.CategoryId,
            StoreId: product.StoreId,
          });
        }
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      imgUrl: DataTypes.STRING,
      description: DataTypes.STRING,
      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      CategoryId: DataTypes.INTEGER,
      StoreId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
