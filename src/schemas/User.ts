import mongoose from "../database/connectToMongoDbUsers";
import GoogleInfoSchema from "./GoogleInfo";
import FacebookInfoSchema from "./FacebookInfo";
import LinkedInInfoSchema from "./LinkedInInfo";

const Schema = mongoose.Schema;

export default new Schema({
  displayName: { type: String, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  pictureURL: { type: String, required: true },
  preferredLanguage: { type: String },
  email: { type: String },
  google: { type: GoogleInfoSchema },
  facebook: { type: FacebookInfoSchema },
  linkedin: { type: LinkedInInfoSchema },
  data: { type: mongoose.SchemaTypes.Mixed }
});
