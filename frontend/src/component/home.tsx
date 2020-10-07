import React from 'react';
import { CommentsEditor } from './commentseditor';
interface Props { }
interface State {
}

export class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }


    public render() {

        return <>
            <div className={'home'}>
                <img src='img/banner2.jpg' />
                <h1>TERRA D'ELYSSA</h1>
                <p>
                    Riche d’un héritage de plus de 3 000 ans, nous produisons notre huile d’olive
                    en respect des normes de qualité les plus strictes, cueillons toujours nos
                    olives à la main et travaillons nos champs d’oliviers sans utiliser de
                    produits chimiques. La fierté d’un héritage ou le symbole du cheval représente
                    la fertilité et de prospérité a cartage, la royaume des amazighs.
                </p>
                <div className={'body2'} >
                    <CommentsEditor />
                </div>


            </div>
        </>;
    }

}
