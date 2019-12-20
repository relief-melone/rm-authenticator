import GoogleInfo from "./GoogleInfo";
import FacebookInfo from "./FaceBookInfo";
import LinkedInInfo from "./LinkedInInfo";
import { ObjectId } from "bson";

export default interface User {
  _id?: string | ObjectId;
  displayName: string;
  lastName: string;
  firstName: string;
  pictureURL: string;
  preferredLanguage: string;
  email: string;
  google?: GoogleInfo;
  facebook?: FacebookInfo;
  linkedin?: LinkedInInfo;
  data?: any;
}
