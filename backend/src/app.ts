import bodyParser from 'body-parser';
import { UserModel } from 'common';
import errorHandler from 'errorhandler';
import express from 'express';
import MySQLStore from 'express-mysql-session';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { config } from './config';
import { AuthDAO } from './dao/authdao';
import { authRouter, loginHandler } from './router/authrouter';
import { commentRouter } from './router/commentrouter';

const authDAO = new AuthDAO;

const sessionStore = new (MySQLStore(session as any))({
    host: config.database.url,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database + '_session'
});

const app = express();
app.use(session({
    name: 'archetype_session',
    secret: 'OIA6VpPDtfSYNh2AX*r',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

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
passport.deserializeUser(async (userId: number, done) => {
    const user = await authDAO.getUserById(userId);
    done(null, user);
});
passport.serializeUser((user: UserModel, done) => {
    done(null, user.userId);
});
passport.use(new Strategy(loginHandler));


app.use('/comment', commentRouter);
app.use('/auth', authRouter);


export { app };
