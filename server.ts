import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as logger from 'morgan';
import * as cors from 'cors';
import * as Bluebird from 'bluebird';

import router from './router/v1';
import config from './config/main';

const app = express();

// use bluebird
(<any>mongoose).Promise = Bluebird;


// init mongoose
mongoose.connect(config.db, (err, res)=>{
  if (err){
    console.log(`'Database connection error: ${config.db}`);
  }
  console.log(`Connectado em ${config.db}`);
});


// express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());


// init server
let server;
if (process.env.NODE_ENV !== config.test_env) {
  server = app.listen(config.port);
  console.log(`Server listening on port ${config.port}`);
} else {
  server = app.listen(config.test_port);
  console.log(`Server listening on port ${config.test_port}`);
}


// router
router(app);


// export
export default server;