export class UserModel {
    public userId: number;
    public username: string;
    public password: number;

    public static fromJSON(jsonUserModel: UserModel) {
        const userModel = new UserModel;
        Object.assign(userModel, jsonUserModel);
        return userModel;
    }
}