// import { CommentModel } from 'common';
// import { DBProvider } from '../dbprovider';

// export class CommentDAO {
//     private knex = DBProvider.getKnexConnection();

//     public async createComment(Comment: CommentModel) {
//         const { personName,contentMessage, publicationDate } = Comment;
//         const [commentId] = await this.knex('comment').insert({ personName, contentMessage, publicationDate });
//         return commentId;
//     }

//     public async getComment(commentId: number | string) {
//         const comment = await this.knex('comment').first('*').where({ commentId });
//         if (!comment) { return null; }
//         return CommentModel.fromJSON(comment);
//     }

//     public async updateComment(Comment: CommentModel) {
//         const { personName, contentMessage, publicationDate } = Comment;
//         await this.knex('comment').update({ personName, contentMessage, publicationDate }).where({ commentId });
//     }

//     public async deleteComment(commentId: number) {
//         await this.knex('comment').delete().where({ commentId });
//     }

//     public async getComments() {
//         const comments = await this.knex('comment').select('*');
//         return comments.map(CommentModel.fromJSON);
//     }
// }
import { CommentModel } from 'common';
import { DBProvider } from '../dbprovider';

export class CommentDAO {
    private knex = DBProvider.getKnexConnection();

    public async createComment(Comment: CommentModel) {
        const { personName, contentMessage, publicationDate } = Comment;
        const [commentId] = await this.knex('comment').insert({ personName, contentMessage, publicationDate });
        return commentId;
    }

    public async getComment(commentId: number | string) {
        const comment = await this.knex('comment').first('*').where({ commentId });
        if (!comment) { return null; }
        return CommentModel.fromJSON(comment);
    }

    public async updateComment(Comment: CommentModel) {
        const { commentId, personName, contentMessage, publicationDate } = Comment;
        await this.knex('comment').update({ personName, contentMessage, publicationDate }).where({ commentId });
    }

    public async deleteComment(commentId: number) {
        await this.knex('comment').delete().where({ commentId });
    }

    public async getComments() {
        const comments = await this.knex('comment').select('*');
        return comments.map(CommentModel.fromJSON);
    }
}
