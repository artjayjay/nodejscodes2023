const Joi = require("joi");

async function loginvalidation(req, res, next) {
  const { username, password } = req.body;
  var schema = Joi.object().keys({
    username: Joi.string().invalid("undefined").min(1).required(),
    password: Joi.string().invalid("undefined").min(1).required(),
  });
  var dataToValidate = {
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

module.exports = {
  loginvalidation: loginvalidation,
};
