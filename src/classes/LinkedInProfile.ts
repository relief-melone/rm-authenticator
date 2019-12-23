interface _jsonName {
  localized: Record<string,string>;
  preferredLocale: {
    country: string;
    language: string;
  };
}

interface LinkedInImage {
  value: string;
}

interface LinkedInEmail {
  value: string;
}
export default interface LinkedInProfile {
  _json: {
    id: string;
    firstName: _jsonName;
    lastname: _jsonName;
    profilePicture: {
      displayImage: string;
      'displayImage~': any;
    };
  };
  _emailJSON: any;
  _raw: string;
  _emailRaw: string;
  displayName: string;
  id: string;
  name: {
    familyName: string;
    givenName: string;
  };
  photos: LinkedInImage[];
  provider: 'linkedin';
  emails: LinkedInEmail[];
}