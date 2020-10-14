import 'module-alias/register';

import http from 'http';
import express from 'express';
import expressConfig from '@/config/config.express';
import usePassort from '@/authentication/passport';
import cookieParser from 'cookie-parser';

import authRoutes from '@/routes/auth';

import { initDatabase } from '@/database/connectToMongoDbUsers';
import setCorsHeaders from './middleware/setCorsHeaders';
import acceptOptions from './middleware/acceptOptions';
import setRedirectUrl from './middleware/setRedirectUrl';

export default (): void => {
  const app = express();
  initDatabase();

  // Send ok to OPTIONS preflight requests;
  app.use(setCorsHeaders);
  app.use(acceptOptions);

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true
    })
  );

  usePassort(app);
  app.use(setRedirectUrl);

  app.use('/auth', authRoutes);

  app.get('/', (req, res, next) => {
    res.send('<h1>Welcome to the RM-Authenticator</h1>');
  });

  app.get('/userinfo', (req, res, next) => {
    if (!req.session) {
      res.json({}).send();
    } else {
      if (!req.session.passport) {
        res.json({}).send();
      } else {
        res.json(req.session.passport.user).send();
      }
    }
  });

  http.createServer(app).listen(expressConfig.httpPort, () => {
    console.log(`HTTP Server listening on ${expressConfig.httpPort}`);
  });

};
