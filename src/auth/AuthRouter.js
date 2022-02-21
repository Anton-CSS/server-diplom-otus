const { check } = require("express-validator");
const Router = require("express");

const router = new Router();
const controller = require("./AuthController");
const authMiddleware = require("../middlewear/authmiddlewear");

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Пароль должен быть больше 4 и не менее 12 символов"
    ).isLength({ min: 4, max: 12 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", authMiddleware, controller.getUsers);
router.get("/checking", controller.checkToken);

module.exports = router;
