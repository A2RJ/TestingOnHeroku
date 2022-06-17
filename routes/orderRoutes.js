const orderRoutes = require("express").Router();
const OrderController = require("../controllers/OrderController");

orderRoutes.get("/", OrderController.index);
orderRoutes.get("/:UserId/user", OrderController.userOrders);
orderRoutes.get("/:UserId/seller", OrderController.sellerOrders);
orderRoutes.get("/:ProductId/:UserId/order", OrderController.order);
orderRoutes.get("/:OrderId/cancel", OrderController.cancel);
orderRoutes.get("/:OrderId/delivery", OrderController.delivery);
orderRoutes.get("/:OrderId/complete", OrderController.complete);
orderRoutes.get("/:OrderId/destroy", OrderController.destroy);

module.exports = orderRoutes;
