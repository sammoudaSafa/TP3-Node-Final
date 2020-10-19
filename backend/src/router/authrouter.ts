// import { wrap } from '../util';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import passport from 'passport';
import { AuthDAO } from '../dao/authdao';
import { wrap } from '../util';


const authRouter = Router();
// const knex = DBProvider.getKnexConnection();
const authDAO = new AuthDAO;
// const users = [{ username: 'safa', password: '$2b$10$ZtZko2qKObAfLQ17eapOseN9gQRJhQY/vcNwNx.7Onyei/lJ7i0Ua' }];
// const slatRounds = 10;

authRouter.get('/login', passport.authenticate('local', {
    session: true
}), (req, res) => {
    // const username = req.query.username as string;
    // const password = req.query.password as string;
    // const user = users.find(userBeingSearched => userBeingSearched.username === username);
    // const matches = await bcrypt.compare(password, user?.password ?? '');
    // if (!matches) { return res.sendStatus(401); }
    // const hash = await bcrypt.hash(password, slatRounds);
    // console.log(`${hash}`);

    if (req.user) {
        res.send();
    } else {
        res.sendStatus(401);
    }
    return res.send();
});
// logout
authRouter.get('/logout', wrap(async (req, res) => {
    if (!req.session) { return res.send(); }
    req.session.destroy(err => {
        if (err === !undefined) {
            console.error(`Error destroying session, ${err}`);
        }
    });
    return res.send();
}));

// user
authRouter.get('/user', wrap(async (req, res) => {
    if (!req.user) { return res.sendStatus(404); }
    return res.send(req.user);
}));

const loginHandler = async (username: string, password: string, done: (error: any, user?: any) => void) => {
    // const user = await knex('user').first('userId', 'username', 'password').where({ username });
    const user = await authDAO.getUser(username);
    if (user === null) {
        return done(null, false);
    }
    if (await bcrypt.compare(password, user.password!)) {
        delete user.password;
        return done(null, user);
    }
    return done(null, false);

};

export { authRouter, loginHandler };
