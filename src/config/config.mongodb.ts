import { getEnabled } from './functions/getEnabled';
import { Database } from '../classes/Database';

export default (getEnabled(Database.mongodb)
  ? (env = process.env): any => {
    const host = env.MONGODB_HOST || 'localhost';
    const port = env.MONGODB_PORT || '27017';
    const db = env.MONGODB_DB || 'sampledb';
    const user = env.MONGODB_USER;
    const password = env.MONGODB_PASSWORD;

    const connectionString = env.MONGODB_CONNECTION_STRING || `mongodb://${user}:${password}@${host}:${port}/${db}`;

    return { connectionString };
  }
  : (): null => null);
