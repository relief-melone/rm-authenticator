import sinon from 'sinon';
import mergeUsersAndDeleteDuplicates from '../src/services/mergeUsersAndDeleteDuplicates';
import User from '../src/classes/User';
import chai, { expect } from 'chai';
import chaiExclude from 'chai-exclude';

chai.use(chaiExclude);

describe('mergeUsersAndDeleteDuplicates', () => {
  let users: User[];
  let userModel;

  beforeEach(() => {
    users = [
      Object.assign(
        new User({ displayName: 'Jon Doe', email: 'some.mail@mail.com', firstName: 'John', lastName: 'Doe', pictureURL: 'url', preferredLanguage: 'de', facebook: { emails: ['my-facebook-mail@mail.com'] }, google: null }),
        { toObject(){ return this;} }
      ),
      Object.assign(
        new User({ displayName: 'Jon Doe', email: 'my-google-mail@mail.com', firstName: 'John', lastName: 'Doe', pictureURL: 'url', preferredLanguage: 'de', google: { emails: ['my-google-mail@mail.com'] }, facebook: { emails: ['my-facebook-mail@mail.com'] } }),
        { toObject(){ return this;} }
      )      
    ];
    userModel = sinon.stub({
      findByIdAndDelete: () => {}
    });
  });

  it('will merge 2 users together and delete duplicates', async () => {
    // Prepare
    userModel.findByIdAndDelete.resolves(true);

    // Execute
    const actualUser = await mergeUsersAndDeleteDuplicates(users as any, userModel);

    // Assert
    sinon.assert.calledOnce(userModel.findByIdAndDelete);
    expect(actualUser).excluding(['toObject','withoutEmptyProviders']).to.deep.equal(users[1]);

  });
});