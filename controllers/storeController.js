const { User, Store, Product } = require("../models");
const { Op } = require("sequelize");
class StoreController {
    static editForm(req, res) {
        Store.findOne({
            where: {
                UserId: req.session.currentUser.id,
            },
        })
            .then((data) => {
                res.render("editStore", { data, session: req.session });
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static edit(req, res) {
        Store.update(req.body, {
            where: {
                UserId: req.session.currentUser.id,
            },
        })
            .then((data) => {
                res.redirect("/stores/edit");
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static delete(req, res) {
        Store.destroy({
            where: {
                UserId: req.session.currentUser.id,
            },
        })
            .then((data) => {
                req.session.currentUser.hasStore = false;
                res.redirect("/");
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static getStoreProducts(req, res) {
        let { page, search, sortPrice } = req.query;

        let query = {
            where: { StoreId: req.params.id },
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

        query.offset = page * 15;
        query.limit = 15;

        Product.findAll(query)
            .then((data) => {
                res.render("storeProduct", {
                    data,
                    id: req.params.id,
                    session: req.session,
                });
            })
            .catch((err) => {
                res.send(err);
            });
    }
}

module.exports = StoreController;
