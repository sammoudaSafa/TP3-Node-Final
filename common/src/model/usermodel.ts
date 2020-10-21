import { Permission, rolePermissions } from '../enum/permission';
import { Role } from '../enum/role';
export class UserModel {
    public userId: number;
    public username: string;
    public password?: string;
    public roles: Role[];

    constructor() {
    }
    public static fromJSON(jsonUserModel: UserModel) {
        const userModel = new UserModel;
        Object.assign(userModel, jsonUserModel);
        return userModel;
    }

    public hasPermission(permission: Permission) {
        return this.roles.some(role => {
            return rolePermissions[role].includes(permission);
        });
    }
}
