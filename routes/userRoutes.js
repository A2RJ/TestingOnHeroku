const router = require("express").Router();
const UserController = require("../controllers/UserController");
const validator = require("../middleware/validator");
router.get("/register", validator("checkLogin"), UserController.registerForm);
router.post("/register", validator("checkLogin"), UserController.register);
router.get("/login", validator("checkLogin"), UserController.loginForm);
router.post("/login", validator("checkLogin"), UserController.login);
router.get("/logout", validator("checkHasLogin"), UserController.logout);
router.get("/edit", validator("checkHasLogin"), UserController.editForm);
router.post("/edit", validator("checkHasLogin"), UserController.edit);
router.get(
    "/makeStore",
    validator("checkHasLogin"),
    UserController.makeStoreForm
);
router.post("/makeStore", validator("checkHasLogin"), UserController.makeStore);

module.exports = router;
