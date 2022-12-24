import winston from "winston";
const { combine, timestamp, colorize, align, printf } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    colorize({ all: true }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  silent: process.env.NODE_ENV === "test",

  transports: [new winston.transports.Console()],
});

export default logger;
