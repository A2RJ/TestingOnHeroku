const express = require("express");
const MainController = require("../controllers/MainController");
const MainRoutes = express.Router();

MainRoutes.get("/", MainController.getAllProducts);

module.exports = MainRoutes;
