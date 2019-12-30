import getActiveProviders from '../services/getActiveProviders';

interface UserI {
  __v?: number;
  _id?: string;
  displayName: string;
  email: string;
  facebook?: any;
  google?: any;
  linkedin?: any;
  firstName: string;
  lastName: string;
  pictureURL: string;
  preferredLanguage: string | null;
}


export default class User implements UserI{
  __v?: number;
  _id?: string;
  displayName: string;
  email: string;
  facebook: any | null;
  google: any | null;
  linkedin: any | null;
  firstName: string;
  lastName: string;
  pictureURL: string;
  preferredLanguage: string | null;

  constructor(User: UserI){
    if(User.__v) this.__v = User.__v;
    if(User._id) this._id = User._id;
    this.displayName = User.displayName;
    this.email = User.email;
    this.facebook = User.facebook ? User.facebook : null;
    this.google = User.google ? User.google : null;
    this.linkedin = User.linkedin ? User.linkedin : null;
    this.firstName = User.firstName;
    this.lastName = User.lastName;
    this.pictureURL = User.pictureURL;
    this.preferredLanguage = User.preferredLanguage;
  }

  get emails(): string[]{
    const emails: string[] = [this.email];
    if(this.facebook) emails.push(...this.facebook.emails);
    if(this.google) emails.push(...this.google.emails);
    if(this.linkedin) emails.push(...this.linkedin.emails);
    return emails.filter((item, index) => emails.indexOf(item) === index);
  }

  get withoutEmptyProviders(): any {
    const clone = new User(this);
    getActiveProviders().forEach(provider => {
      if(clone[provider] === null ) delete clone[provider];
    });
    return clone;
  }
}