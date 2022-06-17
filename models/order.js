"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.User, {
      //   foreignKey: 'UserId',
      //   onDelete: 'CASCADE'
      // });
      // Order.belongsTo(models.Product, {
      //   foreignKey: 'ProductId',
      //   onDelete: 'CASCADE'
      // });
      Order.belongsTo(models.User);
      Order.belongsTo(models.Product);
    }

    static updateStatus(id, status) {
      return Order.update({ status: status }, { where: { id: id } });
    }

    get createdAtFormatted() {
      return this.createdAt.toLocaleString();
    }

    static validator(order) {
      return new Promise((resolve, reject) => {
        const errors = [];
        if (!order.UserId) {
          errors.push("User is required");
        }
        if (!order.ProductId) {
          errors.push("Product is required");
        }

        if (order.length > 0) {
          reject(errors);
        } else {
          resolve({
            ProductId: order.ProductId,
            UserId: order.UserId,
          });
        }
      });
    }
  }
  Order.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "ProductId Must not be Empty" } },
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: { notEmpty: { msg: "UserId Must not be Empty" } },
      },
      isFinished: {
        type: {
          type: DataTypes.BOOLEAN,
          validate: {
            notEmpty: { msg: "isFinished Must not be Empty" },
          },
        },
        defaultValue: false,
      },
      status: {
        type: {
          type: DataTypes.STRING,
          validate: { notEmpty: { msg: "status Must not be Empty" } },
        },
        defaultValue: "On Process",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
