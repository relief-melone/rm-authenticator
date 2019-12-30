import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default new Schema({
  id: { type: String, required: true },
  pictureURL: { type: String },
  language: { type: String },
  emails: { type: [String], required: true }
});
