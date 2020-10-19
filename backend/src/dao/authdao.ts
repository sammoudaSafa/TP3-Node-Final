import { UserModel } from 'common';
import { DBProvider } from '../dbprovider';

export class AuthDAO {

    private knex = DBProvider.getKnexConnection();

    public async getUser(username: string) {
        const user: UserModel | null = await this.knex('user').first('userId', 'username', 'password').where({ username });
        return user;
    }
    public async getUserById(userId: number) {
        const user: UserModel | null = await this.knex('user').first('userId', 'username', 'password').where({ userId });
        return user;
    }
}
