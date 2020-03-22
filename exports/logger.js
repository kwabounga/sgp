exports.logger = function(conf) {
  // logger.info("127.0.0.1 - there's no place like home");
  // logger.warn("127.0.0.1 - there's no place like home");
  // logger.error("127.0.0.1 - there's no place like home");
  const winston = require('winston');

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
      service: 'user-service'
    },
    emitErrs: false,
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({
        filename: conf.err_file,
        level: 'error'
      }),
      new winston.transports.File({
        filename: conf.log_file,
        date: Date.now()
      })
    ]
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }
  return logger;
}
