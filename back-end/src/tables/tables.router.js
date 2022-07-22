const methodNotAllowed = require("../errors/methodNotAllowed");

const router = require("express").Router();
const controller = require("./tables.controller");
const seatRouter = require("../seat/seat.router");

router.use("/:table_id/seat", controller.tableExists, seatRouter);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

module.exports = router;
