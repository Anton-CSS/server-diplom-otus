const Router = require("express");

const router = new Router();
const controller = require("./eventController");

router.get("/guests", controller.receiveGuests);
router.post("/addendum", controller.addEvent);
router.get("/", controller.getEvents);

module.exports = router;
