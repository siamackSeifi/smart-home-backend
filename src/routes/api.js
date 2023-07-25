const express = require("express");
const router = express.Router();
const {authentication} = require("../middlewares/authentication");
const {authorization} = require("../middlewares/authorization");
const {validation} = require("../middlewares/validation");

//region Controllers
const homeController = require("../controllers/homeController");
//endregion


/*
=============================================================================
Routes
=============================================================================
*/
router.get("/:home/smoke", authentication, authorization, validation, homeController.smokeEventHandler)
router.get("/:home/pillNotTaken", authentication, authorization, validation, homeController.pillNotTakenEventHandler)
router.get("/:home/mowed", authentication, authorization, validation, homeController.mowedEventHandler)
router.get("/:home/vacuumed", authentication, authorization, validation, homeController.vacuumedEventHandler)



module.exports = router;
