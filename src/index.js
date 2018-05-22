import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Shorten.less';
import Shorten from './Shorten';
import registerServiceWorker from './registerServiceWorker';

var startProps = { rootUrl: "http://short.ly" }
ReactDOM.render(<Shorten {...startProps} />, document.getElementById('root'));
registerServiceWorker();
