const user1 = require("../../models/user1");

const userauth = async (req, res, next) => {
  res.locals.results = "none";
  res.locals.position = "none";
  res.locals.loggedinstat = "none";
  try {
    let { username } = req.body;
    let usernamefiltered = await username;
    const results = await user1.findOne({
      username: usernamefiltered,
    });
    if (results) {
      res.locals.results = results;
      res.locals.position = "user1";
      res.locals.loggedinstat = "success";
      next();
    } else {
      res.locals.results = "none";
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userauth: userauth,
};
