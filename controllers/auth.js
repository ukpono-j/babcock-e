const jwt = require("jsonwebtoken");
const passport = require("../handlers/auth");
const { User } = require("../models/index");

module.exports = {
  _name: "auth",
  login: [
    passport.authenticate("local", {
      failureRedirect: "/login.html",
    }),
    (req, res, next) => {
      return res.redirect("/department");
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
    async (req, res, next) => {
      try {
        const user = await User.create(req.body);
        next();
      } catch (err) {
//         res.internalServerError().send(err);
        res.redirect("/sign-up.html");
      }
    },
    passport.authenticate("local", {
      failureRedirect: "/login.html",
    }),
    (req, res) => {
      return res.redirect("/department");
    },
  ],
};
