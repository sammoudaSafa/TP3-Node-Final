import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { MainRouter } from './mainrouter';

Modal.setAppElement('#coreContainer');

ReactDOM.render(<MainRouter />, document.getElementById('coreContainer'));
