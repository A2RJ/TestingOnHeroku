const { Op } = require("sequelize");
const { User, Store, Product } = require("../models");

class MainController {
  static getAllProducts(req, res) {
    let { page, search, sortPrice, error } = req.query;

    let query = {
      where: {},
      include: [Store],
    };

    if (search) {
      query.where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }

    if (!page) {
      page = 0;
    }

    if (sortPrice) {
      query.order = [["price", sortPrice]];
    }

    // query.offset = page * 15;
    // query.limit = 15;
    Product.findAll(query).then((data) => {
      res.render("home", { data: data, session: req.session, error });
    });
  }
}

module.exports = MainController;
