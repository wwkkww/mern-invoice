import chalk from "chalk";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { systemLogs, morganMiddleware } from './utils/Logger.js'

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// express middleware to parse incoming req to json payload
app.use(express.json());

// middleware deals with URL-encoded form data
// decide between utilizing the query-string library (with `extended: true`)
// or the built-in `querystring` module (with `extended: false`)
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());


// log incoming request
app.use(morganMiddleware) 


app.get("/api/v1/test", (req, res) => {
  res.json({ data: "You are awesome!!!" });
});

const PORT = process.env.PORT || 1997;

app.listen(PORT, () => {
  console.log(
    `${chalk.green.bold("✅")} 👍 Server running in ${chalk.yellow.bold(process.env.NODE_ENV)} mode on ${chalk.blue.bold(PORT)}`
  );
  systemLogs.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});
