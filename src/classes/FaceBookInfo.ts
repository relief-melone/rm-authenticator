export default interface FacebookInfo {
  id: string;
  pictureURL?: string;
  emails: string[];
  friends: {
    count: string | null;
  };
}
