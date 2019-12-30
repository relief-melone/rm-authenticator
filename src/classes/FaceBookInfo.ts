export default interface FacebookInfo {
  id: string;  
  emails: string[];
  friends: {
    count: string | null;
  };
  pictureURL?: string;
}
