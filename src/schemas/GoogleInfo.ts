import mongoose from "mongoose";

const Schema = mongoose.Schema;

const googleMails = new Schema({
  type: { type: String },
  value: { type: String }
});

export default new Schema({
  id: { type: String, required: true },
  pictureURL: { type: String },
  language: { type: String },
  emails: { type: [googleMails], required: true }
});
