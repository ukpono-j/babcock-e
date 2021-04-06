const jwt = require("jsonwebtoken");
const passport = require("../handlers/auth");
// const { user: User } = require("../models/index");

module.exports = {
  _name: "auth",
  login: [
    passport.authenticate("local"),
    handleAsync(async (req, res, next) => {
      return res.json(req.user);
    }),
  ],

  logout: (req, res) => {
    req.logout();
    return req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      return res.redirect("/");
    });
  },
}