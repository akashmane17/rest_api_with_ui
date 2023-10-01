//Database connection
import mongoose from "mongoose";
import config from "config";
import log from "./logger";

/**Connect to database */
async function connect() {
  // get dbUrl from config
  const dbUri = config.get<string>("dbUri");
  console.log(dbUri);
  
  try {
    await mongoose.connect(dbUri);
    log.info("connected to DB");
  } catch (e) {
    log.error("could not connect to db");
    process.exit(1);
  } 
}

export default connect;