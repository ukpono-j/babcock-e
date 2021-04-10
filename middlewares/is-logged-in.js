module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) return res.forbidden().redirect("/login.html");
  return next();
};
