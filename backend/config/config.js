var config = {
  SERVER_HOST:        process.env.SERVER_HOST || 'localhost',
  SERVER_PORT:        process.env.SERVER_PORT || '4008',
  SERVER_EXPORT:      'http://localhost:4010',
  MONGO_PATH:         process.env.MONGO_PATH || 'mongodb://localhost:27017/tfm-uex',
  SERVER_MAIL:        '',
  USER_MAIL:          '',
  PASSWORD_MAIL:      '',
  TOKEN_SECRET:       process.env.TOKEN_SECRET || "tfg.uex.luciofondon"
}

module.exports = config;
