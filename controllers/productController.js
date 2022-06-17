const { Product, Category, Store, User } = require("../models");
const { Op } = require("sequelize");

class ProductController {
  static index(req, res) {
    let params = {
      where: {
        StoreId: req.session.currentUser.Store.id,
      },
    };

    if (req.query.search) {
      params.where = {
        [Op.and]: [
          {
            StoreId: req.session.currentUser.Store.id,
          },
          {
            name: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
        ],
      };
    }

    let products = [];

    Product.findAll(params)
      .then((productsList) => {
        products = productsList;
        return Store.findByPk(req.params.StoreId, {
          include: [User],
        });
      })
      .then((store) => {
        res.render("products/index", {
          products,
          store,
          session: req.session,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static create(req, res) {
    Category.findAll()
      .then((categories) => {
        res.render("products/create", {
          categories,
          StoreId: req.params.StoreId,
          session: req.session,
          errors:
            req.query && req.query.errors ? req.query.errors.split(",") : [],
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static show(req, res) {
    Product.findByPk(req.params.id, {
      include: [Category, Store],
    })
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static store(req, res) {
    Product.validator(req.body)
      .then((validated) => {
        return Product.create(validated);
      })
      .then((product) => {
        res.redirect(`/products/${req.params.StoreId}`);
      })
      .catch((err) => {
        res.redirect(`/products/${req.params.StoreId}/create?errors=${err}`);
      });
  }

  static edit(req, res) {
    let categories = [];
    Category.findAll()
      .then((categoriesRes) => {
        categories = categoriesRes;
        return Product.findByPk(req.params.ProductId, {
          include: [Category],
        });
      })
      .then((product) => {
        res.render("products/edit", {
          product,
          categories,
          StoreId: req.params.StoreId,
          session: req.session,
          errors:
            req.query && req.query.errors ? req.query.errors.split(",") : [],
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static update(req, res) {
    Product.validator(req.body)
      .then((validated) => {
        return Product.update(validated, {
          where: {
            id: req.params.ProductId,
          },
        });
      })
      .then(() => {
        res.redirect(`/products/${req.body.StoreId}`);
      })
      .catch((err) => {
        res.redirect(`/products/${req.body.StoreId}/edit?errors=${err}`);
      });
  }

  static destroy(req, res) {
    Product.destroy({
      where: {
        id: req.params.ProductId,
      },
    })
      .then(() => {
        res.redirect(`/products/${req.session.currentUser.Store.id}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = ProductController;
