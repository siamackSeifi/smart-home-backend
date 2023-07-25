const express = require("express");
const apiRoutes = require("./src/routes/api");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("./src/middlewares/cors");
const bot = require("./src/utilities/telegramBot");
const errorHandler = require("./src/middlewares/errors");

// make connection to MongoDB database
require("./src/models/_Connection");

//Api server create and config
const api = express();

//secure my api's
api.use(helmet());
api.use(express.json({limit: "50kb"}));
api.use(express.urlencoded({extended: true, limit: "50kb"}));
api.use(cookieParser());

api.use(cors);
api.use(apiRoutes);

//error handling for api's
api.use(errorHandler);

api.get("/", (req, res) => res.send(`Nothing to show`));

module.exports.api = api;
