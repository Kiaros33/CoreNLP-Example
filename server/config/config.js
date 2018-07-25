const config = {
  production: {
    PORT: process.env.PORT,
  },

  default: {
    PORT: 3001,
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
