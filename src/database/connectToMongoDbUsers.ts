import { Mongoose } from 'mongoose';
import mongoConfig from '../config/config.mongodb';

const mongoose = new Mongoose();

export const initDatabase = (config = mongoConfig()): Promise<Mongoose>|void => {
  if (!config) {
    console.log('No MongoDB configured! Will not connect!');
    return;
  }
  console.log(`Attemping to connect to ${config.connectionString}`);
  const connection = mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  mongoose.connection.on('open', () => {
    console.log('Successfully connected!');
  });
  return connection;
};

export default mongoose;
