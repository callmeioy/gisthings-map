/**
 * 应用程序入口文件 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {CesiumViewerCom} from './module/CesiumViewer/CesiumViewerCom';
// require('@cesium/Widgets/widgets.css'); // 引入全局样式
// require('./style.scss');
import './style.scss'
import '@cesium/Widgets/widgets.css'

import * as Cesium from '@cesium/Cesium'
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from '@src/store/rootReducer'

// debug 
window.Cesium = Cesium

console.log('rootReducer',rootReducer)
const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store = {store}>
        <CesiumViewerCom />
    </Provider>,
    document.getElementById('root')
    );