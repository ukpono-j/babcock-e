module.exports = function (req, res, next) {
  if (!req.isAuthenticated()) return res.forbidden().end();
  return next();
};
