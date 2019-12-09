/**
 * 应用程序入口文件 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import CesiumViewer from './module/CesiumViewer/CesiumViewer.js';
require('@cesium/Widgets/widgets.css'); // 引入全局样式
require('./style.scss');
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from '@src/store/rootReducer'
console.log('rootReducer',rootReducer)
const store = createStore(rootReducer)
ReactDOM.render(
    <Provider store = {store}>
        <CesiumViewer />
    </Provider>,
    document.getElementById('root')
    );