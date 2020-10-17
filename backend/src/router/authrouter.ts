import bcrypt from 'bcrypt';
import { Router } from 'express';
import { wrap } from '../util';
const authRouter = Router();

const users = [{ username: 'safa', password: '$2b$10$ZtZko2qKObAfLQ17eapOseN9gQRJhQY/vcNwNx.7Onyei/lJ7i0Ua' }];
// const slatRounds = 10;

authRouter.get('/login', wrap(async (req, res) => {
    const username = req.query.username as string;
    const password = req.query.password as string;
    const user = users.find(userBeingSearched => userBeingSearched.username === username);
    if (!user) { return res.sendStatus(401); }
    const matches = await bcrypt.compare(password, user.password);
    if (!matches) { return res.sendStatus(401); }
    // const hash = await bcrypt.hash(password, slatRounds);
    // console.log(`${hash}`);
    return res.send();
}));

export { authRouter };
