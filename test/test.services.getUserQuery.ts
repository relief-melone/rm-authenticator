import getUserQuery from '../src/services/getUserQuery';
import User from '../src/classes/User';
import { expect } from 'chai';

describe('getUserQuery', () => {
  it('will correctly return the query for all the unique email addresses of the user', () => {
    // Prepare
    const user = new User({
      displayName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.Doe@googlemail.com',
      pictureURL: 'coolUrl.com',
      preferredLanguage: 'en',
      facebook: {
        emails: ['some-trashy-mail-for-facebook@gmail.com', 'some-other-mail@mail.com']
      },
      google: {
        emails: ['John.Doe@googlemail.com', 'some-other-mail@mail.com']
      }
    });

    // Execute
    const query = getUserQuery(user.emails, ['google', 'facebook']);

    // Assert
    expect(Object.keys(query).length).to.equal(1);
    expect(query.$or).to.exist;
    expect(query.$or).to.deep.include.members([
      { 'email': 'John.Doe@googlemail.com' },
      { 'email': 'some-trashy-mail-for-facebook@gmail.com' },
      { 'email': 'some-other-mail@mail.com' },
      { 'google.emails': 'John.Doe@googlemail.com' },
      { 'google.emails': 'some-trashy-mail-for-facebook@gmail.com' },
      { 'google.emails': 'some-other-mail@mail.com' },
      { 'facebook.emails': 'John.Doe@googlemail.com' },
      { 'facebook.emails': 'some-trashy-mail-for-facebook@gmail.com' },
      { 'facebook.emails': 'some-other-mail@mail.com' },
    ]);
  });
});