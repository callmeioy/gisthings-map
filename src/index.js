/**
 * 应用程序入口文件 
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {CesiumViewerCom} from './module/CesiumViewer/CesiumViewerCom';
import {CesiumConfig} from '@src/config/CesiumConfig'
// 引入全局样式
import './style.scss'
import '@cesium/Widgets/widgets.css'

import * as Cesium from '@cesium/Cesium'
import {createStore} from 'redux';
import {Provider} from 'react-redux'
import rootReducer from '@src/store/rootReducer'

// cesium icon 访问令牌
Cesium.Ion.defaultAccessToken = CesiumConfig.IonAccessToken;
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