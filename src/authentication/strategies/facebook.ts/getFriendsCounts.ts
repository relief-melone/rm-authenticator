export default function(profile) {
  if (!profile._json) return null;
  if (!profile._json.friends) return null;
  if (!profile._json.friends.summary) return null;
  return profile.friends.summary.total_count;
}
