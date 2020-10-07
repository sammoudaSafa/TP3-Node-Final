import { CommentView } from 'component/commentview';
import { BASE_HREF } from 'config.json';
import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { Comments } from './component/comments';
import { Home } from './component/home';
import { Owner } from './component/owner';
import { Product } from './component/product';




interface Props { }
interface State { }

export class MainRouter extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {

        return <div className='header-main'>
            < BrowserRouter basename={BASE_HREF}>
                <div className={'menuBar'}>
                    <Link to='/home'>Accueil  </Link>
                    <Link to='/owner'>  Fondateur  </Link>
                    <Link to='/product'>  Produit  </Link>
                    <Link to='/comments'>  Commentaires  </Link>
                </div>
                <Switch>

                    <Route path='/home' component={Home} />
                    <Route path='/owner' component={Owner} />
                    <Route path='/product' component={Product} />
                    <Route path='/comments/:commentId' component={CommentView} />
                    <Route path='/comments' component={Comments} />

                    <Route path='/' component={Home} />

                    {/* <Route path='/' component={CommentsEditor} /> */}

                </Switch>
            </ BrowserRouter>
        </div>;
    }
};
