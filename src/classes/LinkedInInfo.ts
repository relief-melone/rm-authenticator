import LinkedInProfile from './LinkedInProfile';

export default class LinkedInInfo {
  id: string;
  pictureURL: string;
  emails: string[];
  firstName: string;
  lastName: string;
  preferredLanguage: string;
  displayName: string;

  constructor(profile: LinkedInProfile){
    this.id = profile.id;
    this.displayName = profile.displayName;
    this.pictureURL = profile.photos[0].value || 'no-image';
    this.emails = profile.emails.map(e => e.value);
    this.firstName = profile.name.givenName;
    this.lastName = profile.name.familyName;
    this.preferredLanguage = profile._json.firstName.preferredLocale.language.toLowerCase();
  }
}