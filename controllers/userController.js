const { User, Store } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js");
const getErrMessage = require("../helpers/getErrMessage");
class UserController {
    static registerForm(req, res) {
        res.render("registerForm", { session: req.session, error: "" });
    }

    static register(req, res) {
        console.log(req.body);
        User.create(req.body)
            .then((data) => {
                res.redirect("/users/login");
            })
            .catch((err) => {
                res.render("registerForm", {
                    session: req.session,
                    error: getErrMessage(err),
                });
            });
    }

    static loginForm(req, res) {
        res.render("loginForm", { session: req.session, error: "" });
    }

    static login(req, res) {
        User.findOne({ where: { email: req.body.email }, include: [Store] })
            .then((user) => {
                if (user) {
                    let isPasswordMatched = comparePassword(
                        req.body.password,
                        user.password
                    );
                    if (isPasswordMatched) {
                        req.session.currentUser = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            hasStore: user.Store ? true : false,
                            Store: user.Store,
                        };

                        res.redirect("/");
                    } else {
                        res.redirect("/users/login");
                    }
                } else {
                    res.redirect("/users/login");
                }
            })
            .catch((err) => {
                res.render("loginForm", {
                    session: req.session,
                    error: getErrMessage(err),
                });
            });
    }

    static editForm(req, res) {
        res.render("editForm", {
            data: req.session.currentUser,
            session: req.session,
        });
    }

    static getUpdatedProfileData(input) {
        let result = {};
        for (let key in input) {
            if (input[key]) {
                result[key] = input[key];
            }
        }
        return result;
    }

    static edit(req, res) {
        const input = UserController.getUpdatedProfileData(req.body);
        if (input.password) {
            input.password = hashPassword(input.password);
        }

        User.update(input, {
            where: { id: req.session.currentUser.id },
        })
            .then((data) => {
                if (input.name) {
                    req.session.currentUser.name = input.name;
                }
                res.redirect("/");
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static makeStoreForm(req, res) {
        res.render("makeStore", { session: req.session, error: "" });
    }
    static makeStore(req, res) {
        req.body.UserId = req.session.currentUser.id;
        Store.create(req.body)
            .then((data) => {
                req.session.currentUser.hasStore = true;
                res.redirect("/");
            })
            .catch((err) => {
                res.render("makeStore", {
                    session: req.session,
                    error: getErrMessage(err),
                });
            });
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err);
            } else {
                res.redirect("/");
            }
        });
    }
}

module.exports = UserController;
