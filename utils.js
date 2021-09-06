const { env } = require('./config/constants');

module.exports.getUrl = (currentEnv) => {
  switch (currentEnv) {
    case env.prod:
      return 'https://vika.cn/';
    case env.dev:
      return 'https://integration.vika.ltd/';
    default:
      return 'http://staging.vika.ltd/'
  }
}