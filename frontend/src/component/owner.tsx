import React from 'react';

interface Props { }
interface State { }

export class Owner extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {

        return <>
            <div className={'home'}>
                <img src='img/fondateur.jpg' />
                <h1>LE FONDATEUR</h1>
                <p>
                    Riche d’un héritage de plus de 3 000 ans, nous produisons notre huile d’olive
                    en respect des normes de qualité les plus strictes, cueillons toujours nos
                    olives à la main et travaillons nos champs d’oliviers sans utiliser de
                    produits chimiques. La fierté d’un héritage ou le symbole du cheval représente
                    la fertilité et de prospérité a cartage, la royaume des amazighs.
                </p>
            </div>
        </>;
    }

}
