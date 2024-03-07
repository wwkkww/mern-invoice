import morgan from "morgan";
import winston from "winston";
// import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file"

const {combine, timestamp, prettyPrint, printf, json, errors } = winston.format;
const fileRotateTransport =  new winston.transports.DailyRotateFile({
  filename: "logs/combine-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d"
})

export const systemLogs = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A"
    }),
    prettyPrint()
  ),
  transports: [
    fileRotateTransport,
    new winston.transports.File({
      level: 'error',
      filename: "logs/error.log"
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({filename: "logs/exceptions.log"})
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" })
  ]
})


export const morganMiddleware = morgan(
  function(tokens, req, res) {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      response_time: Number.parseFloat(tokens["response-time"](req, res))
    })
  },
  {
    stream: {
      write: (message) => {
        const data = JSON.parse(message);
        systemLogs.http('incoming-request', data)
      }
    }
  }
)