import { Role, UserModel } from 'common';
import { DBProvider } from '../dbprovider';
export class AuthDAO {

    private knex = DBProvider.getKnexConnection();

    public async getUser(username: string) {
        const user: UserModel | null = await this.knex('user').first('userId', 'username', 'password').where({ username });
        if (!user) { return user; }
        await this.hydrate(user);
        return user;
    }
    public async getUserById(userId: number) {
        const user: UserModel | null = await this.knex('user').first('userId', 'username', 'password').where({ userId });
        if (!user) { return user; }
        await this.hydrate(user);
        return user;
    }
    private async hydrate(user: UserModel) {
        const userId = user.userId;
        const roles: Role[] = await this.knex('role').where({ userId });
        user.roles = roles;
        return user;
    }
}
