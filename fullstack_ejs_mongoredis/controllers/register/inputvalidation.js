const Joi = require("joi");

async function registervalidation(req, res, next) {
  const { username, password, lastname, firstname } = req.body;
  var schema = Joi.object().keys({
    lastname: Joi.string().invalid("undefined").min(1).required(),
    firstname: Joi.string().invalid("undefined").min(1).required(),
    username: Joi.string().invalid("undefined").min(1).required(),
    password: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
    lastname: lastname,
    firstname: firstname,
    username: username,
    password: password,
  };
  const validationresult = await schema.validate(dataToValidate);
  if (validationresult.error == null) {
    next();
  } else {
    res.json({ status: "invalid" });
  }
}

async function ifexist(req, res, next) {
  let results = res.locals.results;
  if (results && results != "none") {
    res.json({ status: "invalid" });
  } else {
    next();
  }
}

module.exports = {
  registervalidation: registervalidation,
  ifexist: ifexist,
};
