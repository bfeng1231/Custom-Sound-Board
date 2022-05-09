import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { applyMiddleware} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import {Provider} from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

//const store = createStore(rootReducer, applyMiddleware(thunk));
const store = configureStore({
    reducer: rootReducer
});

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));


