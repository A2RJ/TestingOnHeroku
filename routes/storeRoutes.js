const router = require("express").Router();
const StoreController = require("../controllers/StoreController");
const validator = require("../middleware/validator");

router.get(
    "/edit",
    validator("checkHasLogin"),
    validator("checkHasStore"),
    StoreController.editForm
);
router.post(
    "/edit",
    validator("checkHasLogin"),
    validator("checkHasStore"),
    StoreController.edit
);

router.get(
    "/delete",
    validator("checkHasLogin"),
    validator("checkHasStore"),
    StoreController.delete
);
router.get(
    "/:id/products",

    StoreController.getStoreProducts
);

module.exports = router;
