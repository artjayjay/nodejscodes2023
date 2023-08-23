const crypto = require("crypto");

let noncefunc = () => {
  let nonce = crypto.randomBytes(16).toString("base64");
  return nonce;
};

module.exports = {
  nonce: noncefunc(),
};
