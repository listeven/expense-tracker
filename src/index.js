import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import expenseTracker from './reducers';

import './index.css';

const store = createStore(expenseTracker)

ReactDOM.render(
<Provider store = {store}>
    <App />
</Provider>, 
document.getElementById('root'));
