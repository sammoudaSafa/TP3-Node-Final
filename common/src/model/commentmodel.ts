
export class CommentModel {
    public commentId: number;
    public personName: string;
    public contentMessage: string;
    public publicationDate: Date;

    public static fromJSON(jsonCommentModel: CommentModel) {
        const commentModel = new CommentModel;
        Object.assign(commentModel, jsonCommentModel);
        commentModel.publicationDate = new Date(commentModel.publicationDate);
        return commentModel;
    }
}
