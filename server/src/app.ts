require("dotenv").config();
import express from "express";
import config from "config"
import connect from "./utils/connect";
import log from "./utils/logger";
import router from "./routes";
import  deserializeUser from "./middleware/deserializeUser";

// create app using express
const app = express();

// It parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

// this middlware will be called for every endpoint
app.use(deserializeUser);

// Make use of router that contains all the routes
app.use(router);

// getting port from config
const port = config.get<number>("port");

// Listening our app on our port and also calling a method to connect with database
app.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);

  // Connect to database
  await connect();

});