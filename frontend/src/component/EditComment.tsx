import { Api } from 'api';
import { CommentModel } from 'common';
import React from 'react';


interface Props { comment: CommentModel; onRequestClose(): void; }
interface State {
    personName: string;
    contentMessage: string;
    publicationDate?: Date;
}

export class EditComment extends React.Component<Props, State> {
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = { personName: props.comment.personName, contentMessage: props.comment.contentMessage };
    }


    public render() {
        return <form onSubmit={this.updateComment}>
            Nom: <input value={this.state.personName} required={true} onChange={e => this.setState({ personName: e.target.value })} />
            <br />
            Message: <textarea value={this.state.contentMessage} required={true} onChange={e => this.setState({ contentMessage: e.target.value })} />
            <br />
            <button type='submit'>Sauvegarder</button>
            <button type='button' onClick={this.props.onRequestClose}>Annuler</button>
        </form>;
    }

    private updateComment = async (e: React.FormEvent) => {
        e.preventDefault();
        this.props.comment.personName = this.state.personName;
        this.props.comment.contentMessage = this.state.contentMessage;

        await this.api.put('comment', this.props.comment.commentId, this.props.comment);
        this.props.onRequestClose();
    };


}
