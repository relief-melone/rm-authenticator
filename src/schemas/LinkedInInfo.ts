import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default new Schema({
  id: { type: String, required: true },
  pictureURL: { type: String },
  preferredLanguage: { type: String },
  emails: { type: [String], required: true },
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  displayName: { type: String, required: true},
});
