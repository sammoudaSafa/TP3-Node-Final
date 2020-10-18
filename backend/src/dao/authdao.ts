import { UserModel } from 'common';
import { DBProvider } from '../dbprovider';

export class AuthDAO {

    private knex = DBProvider.getKnexConnection();

    public async getUser(username: string) {
        const user: UserModel | null = await this.knex('user').first('userId', 'username', 'password').where({ username });
        return user;
    }
}
