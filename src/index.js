import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Shorten from './Shorten';
import Form from './Form';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Shorten />, document.getElementById('root'));
registerServiceWorker();
