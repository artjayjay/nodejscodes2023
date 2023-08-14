// config/helmet.js

const helmet = require("helmet");
const { nonce } = require("./nonce");

let helmetconfig = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", `'nonce-${nonce}'`],
        connectSrc: ["'self'", "https://unpkg.com"],
        frameSrc: ["'self'", "https://www.google.com"],
      },
    },
  });
};

let nonceconfig = () => {
  return nonce;
};

module.exports = {
  helmetconfig,
  nonceconfig,
};
