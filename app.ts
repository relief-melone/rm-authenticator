import http from "http";
import https from "https";
import express from "express";
import expressConfig from "./src/config/config.express";
import usePassort from "./src/authentication/passport";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/auth";

import MainConfig from "./src/config/config.main";
import ConfigGoogle, { getGoogleEnabled } from "./src/config/config.google";

const app = express();
const config = {
  main: MainConfig(),
  google: getGoogleEnabled() ? ConfigGoogle() : null
};

// Set Response Headers
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    config.main.applicationCallbackHost
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Auth, Authentication, Authorization, Credentials"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, UPDATE");

  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

usePassort(app);

app.use("/auth", authRoutes);

app.get("/", (req, res, next) => {
  res.render("<h1>Welcome to the RM-Authenticator</h1>");
});

app.get("/userinfo", (req, res, next) => {
  if (!req.session) {
    res.json({}).send();
  } else {
    if (!req.session.passport) {
      res.json({}).send();
    } else {
      res.json(req.session.passport.user).send();
    }
  }
});

http.createServer(app).listen(expressConfig.httpPort, () => {
  console.log(`HTTP Server listening on ${expressConfig.httpPort}`);
});
