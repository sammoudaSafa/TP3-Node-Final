import { Api } from 'api';
import { CommentModel } from 'common';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

interface Props extends RouteComponentProps<{ commentId: string; }> { }
interface State {
    comment?: CommentModel | null;
    currentCommentId?: number;
}

export class CommentView extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public async componentDidMount() {
        await this.componentDidUpdate();
    }

    public async componentDidUpdate() {
        const newCurrentCommentId = parseInt(this.props.match.params.commentId);
        if (this.state.currentCommentId === newCurrentCommentId) {
            return;
        }
        try {
            const comment = CommentModel.fromJSON(await this.api.getJson(`/comment/${newCurrentCommentId}`));
            this.setState({ comment, currentCommentId: newCurrentCommentId });

        } catch {
            this.setState({ comment: null, currentCommentId: newCurrentCommentId });
        }
    }

    public render() {
        const currentCommentId = parseInt(this.props.match.params.commentId);
        const { comment } = this.state;
        if (comment === undefined) { return 'Chargement...'; }
        if (comment === null) {
            return this.renderLinks(currentCommentId);
        }

        const dateFormat = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return <>
            {/* <h2> ★ Le commentaire </h2> */}
            {this.renderLinks(currentCommentId)}
            <div key={comment.commentId} style={{ border: '2px solid', width: '600px', textAlign: 'left' }}>

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
            </div>
        </>;
    }
    private renderLinks(currentCommentId: number) {
        return <>
            <Link to={`/comments/${currentCommentId - 1}`} > Précédent</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={`/comments/${currentCommentId + 1}`} > Suivant</Link>
        </>;
    }
}
