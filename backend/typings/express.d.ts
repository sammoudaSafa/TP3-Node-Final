import { CommentModel, ParticipantModel, UserModel } from "common";

declare global {
    module Express {
        interface Request {
            comment: CommentModel;
            participant: ParticipantModel;
        }
        interface User extends UserModel
    }
}
