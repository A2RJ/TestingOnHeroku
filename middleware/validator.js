function checkLogin(req, res, next) {
    if (req.session.currentUser) {
        res.redirect("/");
    } else {
        next();
    }
}

function checkHasLogin(req, res, next) {
    console.log(req.session);
    if (!req.session.currentUser) {
        res.redirect("/users/login");
    } else {
        next();
    }
}

function checkHasStore(req, res, next) {
    console.log(req.session);
    if (!req.session.currentUser.hasStore) {
        res.redirect("/users/makeStore");
    } else {
        next();
    }
}

function validate(method) {
    switch (method) {
        case "checkLogin":
            return checkLogin;
        case "checkHasLogin":
            return checkHasLogin;
        case "checkHasStore":
            return checkHasStore;
    }
}

module.exports = validate;
