import { CommentModel, ParticipantModel } from "common";

declare global {
    module Express {
        interface Request {
            comment: CommentModel;
            participant: ParticipantModel;
        }
    }
}
