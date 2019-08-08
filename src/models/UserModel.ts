import User from "../schemas/User";
import mongoose from "../database/connectToMongoDbUsers";

if (!mongoose) throw "Not connected to Database!";
export default mongoose.model("User", User);
