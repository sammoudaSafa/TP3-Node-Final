// import { wrap } from '../util';
import bcrypt from 'bcrypt';
import { Router } from 'express';
import passport from 'passport';
import { DBProvider } from '../dbprovider';


const authRouter = Router();
const knex = DBProvider.getKnexConnection();

// const users = [{ username: 'safa', password: '$2b$10$ZtZko2qKObAfLQ17eapOseN9gQRJhQY/vcNwNx.7Onyei/lJ7i0Ua' }];
// const slatRounds = 10;

authRouter.get('/login', passport.authenticate('local', { session: true }), (req, res) => {
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

const loginHandler = async (username: string, password: string, done: (error: any, user?: any) => void) => {
    const user = await knex('user').first('userId', 'username', 'password').where({ username });
    if (user === undefined) {
        return done(null, false);
    }
    if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return done(null, user);
    }
    return done(null, false);

};

export { authRouter };
export { loginHandler };
