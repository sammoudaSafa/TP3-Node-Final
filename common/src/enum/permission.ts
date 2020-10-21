import { Role } from './role';

export enum Permission {
    createComment = 'create comment',
    deleteComment = 'delete comment'
}
export const rolePermissions = {
    [Role.admin]: [Permission.createComment, Permission.deleteComment],
    [Role.user]: [Permission.createComment]

};
