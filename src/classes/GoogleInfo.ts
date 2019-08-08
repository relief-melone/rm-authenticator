interface GoogleMails {
  value: string;
  type: string;
}

export default interface GoogleInfo {
  id: string;
  pictureURL?: string;
  language?: string;
  emails?: GoogleMails[];
}
