const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bootstrap = require("./src/bootstrap");
const temp = path.resolve(process.cwd(), "dev");
const port = process.env.PORT || 3000;
const app = express();

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(temp));

bootstrap().then((firebase) => {
  let count = 0;

  app.use(async (req, res, next) => {
    req.count = ++count;
    res.setHeader("cache-control", "no-cache");
    req.clientAddr = req.headers["client-ip"] || req.headers["x-bb-ip"] || req.headers["x-nf-client-connection-ip"] ||  req.headers["x-forwarded-for"];
    req.accessToken = req.headers["x-access-token"] ||
		      (req.headers["authorization"] || '').split(' ').pop() ||
		      undefined;
    next();
  });

  app.use(require("./routes"));

  app.listen(port,
    () => console.log("\033[1;44;37m INFO \033[0m", `serving on http://localhost:${port}`)
  );
}).catch(err => {
  console.log("\033[1;41;37m ERROR \033[0m", err.message);
  console.error(err);
});