import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { register } from './register'; 
import registerServiceWorker from './registerServiceWorker';
import { NavBar } from './NavBar';
import { BrowserRouter } from 'react-router-dom';

const element = React.createElement("h1", null, 'Hello ,world');

ReactDOM.render(<NavBar />, document.getElementById('root'));
registerServiceWorker();
