export default function(userId: string): string {
  return `https://graph.facebook.com/${userId}/picture`;
}
