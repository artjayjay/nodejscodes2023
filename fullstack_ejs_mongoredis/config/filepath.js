function getfilespath(req, res, next) {
  res.locals.absolutepath = __dirname;
  next();
}

module.exports = {
  getfilespath,
};
