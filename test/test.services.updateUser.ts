import sinon from 'sinon';
import User from '../src/classes/User';
import updateUser from '../src/services/updateUser';
import { expect } from 'chai';

describe('updateUser', () => {
  let validUser: User;
  let userModel: any;
  let mergeUsersAndDuplicates;

  beforeEach(() => {
    validUser  = new User({
      displayName: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      pictureURL: '//some.random.url/some.image.png',
      email: 'john.doe@aol.com',
      preferredLanguage: 'en'      
    });
    userModel = sinon.stub({
      find: () => {},
      create: () => {},
      findByIdAndUpdate: () => {}
    });
    mergeUsersAndDuplicates = sinon.stub();
  });

  it('will correctly update a user that is not present yet', async () => {
    // Prepare
    const user = new User(Object.assign({}, validUser, {
      facebook : { 
        id: '0001', 
        emails: [ 'john.doe@aol.com'],
        friends: { count: 5 },
        pictureURL: '//some.random.url/some.image.png' }
    }));
    userModel.find.resolves([]);
    userModel.create.resolves(Object.assign(user, { toObject(){return this;} }));
    userModel.findByIdAndUpdate.resolves(Object.assign(user, { toObject(){return this;} }));

    // Execute
    const actualUser = await updateUser(user,userModel,mergeUsersAndDuplicates);

    // Assert    
    sinon.assert.calledOnce(userModel.find);
    sinon.assert.calledOnce(userModel.create);
    sinon.assert.notCalled(mergeUsersAndDuplicates);
    sinon.assert.calledWith(userModel.findByIdAndUpdate, user._id, user, { new: true });

    expect(actualUser).to.deep.equal(user);
  });

  it('will correctly add information to a user already present', async () => {
    // Prepare
    const user = new User(Object.assign({}, validUser, {
      facebook : { 
        id: '0001', 
        emails: [ 'john.doe@aol.com'],
        friends: { count: 5 },
        pictureURL: '//some.random.url/some.image.png' }
    }));

    const additionalInfoInDb = {
      google: { 
        id: '0003', 
        emails: ['some.mail@gmail.com'],
        pictureURL: '//google.com/coolPic.jpg',
        language: 'en' 
      }
    };

    userModel.find.resolves([
      Object.assign(new User(Object.assign({}, validUser, additionalInfoInDb, { _id: '12345' })), { toObject(){return this;} })
    ]);    
    userModel.findByIdAndUpdate.resolves(Object.assign(user, { toObject(){return this;} }));

    // Execute
    await updateUser(user,userModel,mergeUsersAndDuplicates);

    // Assert    
    sinon.assert.calledOnce(userModel.find);
    sinon.assert.notCalled(userModel.create);
    sinon.assert.notCalled(mergeUsersAndDuplicates);
  });

  it('will merge users if more than 1 is found containing the emails fo the user', async () => {
    // Prepare
    const user = new User(Object.assign({}, validUser, {
      facebook : { 
        id: '0001', 
        emails: [ 'john.doe@aol.com'],
        friends: { count: 5 },
        pictureURL: '//some.random.url/some.image.png' }
    }));

    const additionalInfoInDb = {
      google: { 
        id: '0003', 
        emails: ['some.mail@gmail.com'],
        pictureURL: '//google.com/coolPic.jpg',
        language: 'en' 
      }
    };

    userModel.find.resolves([
      Object.assign(new User(Object.assign({}, validUser)), { toObject(){return this;} }, { _id: '12345' }),
      Object.assign(new User(Object.assign({}, validUser, additionalInfoInDb)), { toObject(){return this;} }, { _id: '12345' })
    ]);    
    userModel.findByIdAndUpdate.resolves(Object.assign(user, { toObject(){return this;} }));
    mergeUsersAndDuplicates.resolves(new User(Object.assign({}, validUser, additionalInfoInDb)));

    // Execute
    await updateUser(user,userModel,mergeUsersAndDuplicates);

    // Assert    
    sinon.assert.calledOnce(userModel.find);
    sinon.assert.notCalled(userModel.create);
    sinon.assert.calledOnce(mergeUsersAndDuplicates);
  });
});