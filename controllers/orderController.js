const { Op } = require("sequelize");
const { User, Store, Product, Order } = require("../models");

class OrderController {
  static index(req, res) {
    Order.findAll({
      include: [User, Product],
    })
      .then((orders) => {
        res.render("orders/index", {
          orders,
          isSeller: false,
          session: req.session,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static userOrders(req, res) {
    Order.findAll({
      where: {
        UserId: req.params.UserId,
      },
      include: [User, Product],
    })
      .then((orders) => {
        res.render("orders/index", {
          orders,
          isSeller: false,
          session: req.session,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static sellerOrders(req, res) {
    Store.findOne({
      where: {
        UserId: req.params.UserId,
      },
      include: [Product],
    })
      .then((store) => {
        return Order.findAll({
          include: [User, Product],
          where: {
            ProductId: {
              [Op.in]: store.Products.map((product) => product.id),
            },
          },
        });
      })
      .then((orders) => {
        res.render("orders/index", {
          orders,
          isSeller: true,
          session: req.session,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static order(req, res) {
    Product.findByPk(req.params.ProductId, {
      include: [Store],
    })
      .then((product) => {
        if (product.Store.UserId === +req.params.UserId) {
          res.redirect(
            `/?error=You cannot order your own product! ${product.name} please choose another product.`
          );
        } else {
          return Order.create({
            UserId: req.params.UserId,
            ProductId: req.params.ProductId,
          })
            .then((order) => {
              res.redirect(`/orders/${req.params.UserId}/user`);
            })
            .catch((err) => {
              res.send(err);
            });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static cancel(req, res) {
    Order.updateStatus(req.params.OrderId, "Cancelled")
      .then((order) => {
        res.redirect(`/orders/${req.session.currentUser.id}/user`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static delivery(req, res) {
    Order.updateStatus(req.params.OrderId, "Delivery")
      .then((order) => {
        res.redirect(`/orders/${req.session.currentUser.id}/seller`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static complete(req, res) {
    Order.updateStatus(req.params.OrderId, "Completed")
      .then((order) => {
        res.redirect(`/orders/${req.session.currentUser.id}/user`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static destroy(req, res) {
    Order.destroy({
      where: {
        id: +req.params.OrderId,
      },
    })
      .then((order) => {
        res.redirect(`/orders/${req.session.currentUser.id}/user`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = OrderController;
