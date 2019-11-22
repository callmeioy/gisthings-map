import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App.js';
require('@cesium/Widgets/widgets.css'); // 引入全局样式
require('./style.scss');
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from '@src/store/rootReducer'
console.log('rootReducer',rootReducer)
const store = createStore(rootReducer)
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );