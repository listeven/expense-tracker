import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import expenseTracker from './reducers';

import './index.css';

const store = createStore(
    expenseTracker,
    applyMiddleware(
        thunkMiddleware
    )
);

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
