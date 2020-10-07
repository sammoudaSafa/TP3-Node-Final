import { Api } from 'api';
import { CommentModel } from 'common';
import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { EditComment } from './EditComment';

interface Props { }
interface State {
    comments?: CommentModel[];
    personName?: string;
    contentMessage?: string;
    publicationDate?: Date;
    commentBeingEdited?: CommentModel;
}

export class CommentsEditor extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public async componentDidMount() {
        const comments = (await this.api.getJson('/comment') as any[]).map(CommentModel.fromJSON);
        this.setState({ comments });
    }

    public render() {
        const { comments } = this.state;
        if (!comments) { return 'Chargement...'; }

        const dateFormat = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return <>

            <Modal isOpen={this.state.commentBeingEdited !== undefined}
                onRequestClose={() => this.setState({ commentBeingEdited: undefined, comments })}
                contentLabel='Comment Edition' >

                {this.state.commentBeingEdited && <EditComment
                    onRequestClose={() => this.setState({ commentBeingEdited: undefined })}
                    comment={this.state.commentBeingEdited}
                />}

            </Modal>

            <h2> ★ La liste des commentaires </h2>
            {comments.map(comment => <div key={comment.commentId} style={{ border: '2px solid', width: '600px', textAlign: 'left' }}>
                <h3>Commentaire {comment.commentId}: </h3>
                <table >
                    <tbody>
                        <tr>
                            <th>Nom: </th>
                            <td> {comment.personName}</td>
                        </tr>
                        <tr>
                            <th>Message: </th>
                            <td> {comment.contentMessage}</td>
                        </tr>
                        <tr>
                            <th>Date de publication: </th>
                            <td> {comment.publicationDate.toLocaleDateString(undefined /* 'fr-ca' */, dateFormat)}</td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <Link to={`/comments/${comment.commentId}`}><button >Visionner</button></Link>
                <button onClick={() => this.setState({ commentBeingEdited: comment })} >Modifier</button>
                <button onClick={() => this.deleteComment(comment)} >Supprimer</button>
                <br />
            </div>)}

            <form onSubmit={this.createComment} style={{ border: '2px solid darkblue', width: '600px', textAlign: 'center' }}>
                <h2>Créer un nouveau commentaire</h2>
                <label>Nom</label>
                <input required={true} value={this.state.personName ?? ''} onChange={e => this.setState({ personName: e.target.value })} />
                <br />
                <label>Message</label>
                <textarea required={true} value={this.state.contentMessage ?? ''} onChange={e => this.setState({ contentMessage: e.target.value })} />
                <br />
                <label>Date de publication</label>
                <input type='date' required={true} value={this.state.publicationDate?.toISOString()?.slice(0, 10) ?? ''}
                    onChange={e => this.setState({ publicationDate: new Date(e.target.value) })} />
                <br />
                <button>Commenter</button>
            </form>
        </>;
    }
    private createComment = async (e: React.FormEvent) => {
        e.preventDefault();
        const comment = { personName: this.state.personName, contentMessage: this.state.contentMessage, publicationDate: this.state.publicationDate };
        const createdComment = CommentModel.fromJSON(await this.api.postGetJson('/comment', comment));
        this.state.comments!.push(createdComment);
        this.setState({ comments: this.state.comments, personName: '', contentMessage: '', publicationDate: undefined });

    };
    private deleteComment = async (commentToDelete: CommentModel) => {
        await this.api.delete('/comment', commentToDelete.commentId);
        this.setState({ comments: this.state.comments!.filter(comment => comment !== commentToDelete) });
    };

}
