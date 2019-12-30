import GoogleConfig from '../config/config.google';
import FacebookConfig from '../config/config.facebook';
import LinkedinConfig from '../config/config.linkedin';

export default(googleConfig = GoogleConfig, facebookConfig = FacebookConfig, linkedinConfig = LinkedinConfig): string[] => {
  const result: string[] = [];
  if(facebookConfig) result.push('facebook');
  if(googleConfig ) result.push('google');
  if(linkedinConfig) result.push('linkedin');
  return result;
};