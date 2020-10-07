import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import { commentRouter } from './router/commentrouter';

const app = express();

app.set('trust proxy', 'loopback');

app.use(errorHandler({ log: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((_req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

// app.get('/', (_req, res) => {
//     res.send('Allo');
// });

app.use('/comment', commentRouter);

export { app };
