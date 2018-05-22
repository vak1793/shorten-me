import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Shorten.less';
import Shorten from './Shorten';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Shorten />, document.getElementById('root'));
registerServiceWorker();
