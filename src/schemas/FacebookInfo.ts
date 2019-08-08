import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FriendsSchema = new Schema({
  count: { type: Number }
});

export default new Schema({
  id: { type: String, required: true },
  pictureURL: { type: String },
  emails: { type: [String], required: true },
  friends: { type: FriendsSchema }
});
