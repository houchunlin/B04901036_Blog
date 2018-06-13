import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Edit from './Edit';
import Create from './Create';

ReactDOM.render(<App />,
    document.getElementById('root')
  );
  registerServiceWorker();
