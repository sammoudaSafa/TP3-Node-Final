import { CommentsEditor } from 'component/commentseditor';
import React from 'react';

interface Props { }
interface State {
}

export class Comments extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }


    public render() {

        return <>
            <div className={'home'}>
                <h1>TERRA D'ELYSSA</h1>
                {/* <section className='contenu'>Riche d’un héritage de plus de 3 000 ans, nous produisons notre huile d’olive en respect des normes de qualité les plus strictes, cueillons toujours nos olives à la main et travaillons nos champs d’oliviers sans utiliser de produits chimiques. La fierté d’un héritage ou le symbole du cheval représente la fertilité et de prospérité a cartage, la royaume des amazighs.
                </section> */}
                <img src='img/commentsImage.jpg' />
                <div className={'body2'} >
                    <CommentsEditor />
                </div>


            </div>
        </>;
    }

}
