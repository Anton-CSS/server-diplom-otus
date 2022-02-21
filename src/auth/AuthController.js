const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const User = require("../models/User");
const { secret } = require("../secretKey");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            message: `You have done errors during registration`,
            errors,
          });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: `User is already exist` });
      }
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: "USER" });
      let user;
      if (username === "Anton") {
        user = new User({ username, password: hashPassword, roles: ["ADMIN"] });
      } else {
        user = new User({
          username,
          password: hashPassword,
          roles: [userRole],
        });
      }
      await user.save();
      return res.json({ message: "User has successfully registered" });
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: `Server has crashed during registration: ${e}` });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with this username haven't found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: `Invalid password: ${validPassword}` });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: `Server has crashed during login: ${e}` });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({ message: `Server has crashed during gets users: ${e}` });
    }
  }

  async checkToken(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: `No correct token` });
      }
      const decodeDate = jwt.verify(token, secret);
      const user = await User.findOne({ _id: decodeDate.id });
      return res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json({
          message: `Server has crashed during checking of the token: ${e}`,
        });
    }
  }
}

module.exports = new AuthController();
