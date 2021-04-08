const jwt = require("jsonwebtoken");
const passport = require("../handlers/auth");
const { user: User } = require("../models/index");

module.exports = {
  _name: "auth",
  login: [
    passport.authenticate("local", {
      failureRedirect: "/login.html",
    }),
    (req, res, next) => {
      return res.redirect("/department.html");
    },
  ],

  logout: (req, res) => {
    req.logout();
    return req.session.destroy((err) => {
      res.clearCookie("connect.sid");
      return res.redirect("/");
    });
  },

  register: [
    async (req, res) => {
      try {
        const user = await User.create(req.body);
        res.created().json(user.toPublic());
      } catch (err) {
        res.internalServerError().send(err);
      }
    },
    passport.authenticate("local", {
      failureRedirect: "/login.html",
    }),
    (req, res, next) => {
      return res.redirect("/department.html");
    },
  ],
};
