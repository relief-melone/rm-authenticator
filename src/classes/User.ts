import GoogleInfo from "./GoogleInfo";
import FacebookInfo from "./FaceBookInfo";
import { ObjectId } from "bson";

export default interface User {
  _id: string | ObjectId;
  displayName: string;
  lastName: string;
  firstName: string;
  pictureUrl: string;
  preferredLanguage: string;
  email: string;
  google?: GoogleInfo;
  facebook?: FacebookInfo;
  data?: any;
}
