import getActiveProviders from '../services/getActiveProviders';

export default (emails: string[], providers=getActiveProviders()): Record<string,any> => {
  const query: any = { $or: [] };

  emails.forEach(email => {
    query.$or.push({ email });
  });

  providers.forEach(provider => {
    emails.forEach(email => {
      const newQuery: any = {};
      newQuery[`${provider}.emails`] = email;
      query.$or.push(newQuery);
    });    
  });
  return query;
};