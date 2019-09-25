import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App.js';
require('@cesium/Widgets/widgets.css'); // 引入全局样式
require('./style.scss');

ReactDOM.render(<App />,document.getElementById('root'));