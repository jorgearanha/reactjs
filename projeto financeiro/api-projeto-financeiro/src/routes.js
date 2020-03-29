const express = require("express");
const routes = express.Router();

const MovimentacoesController = require("./controller/MovimentacoesController");

routes.get("/", MovimentacoesController.create);

module.exports = routes;
