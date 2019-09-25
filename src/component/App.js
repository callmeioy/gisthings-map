import React from 'react';
import imgurl from '@assets/img/a.png'
import {hot} from 'react-hot-loader'
import Cesium from '@cesium/Cesium'
import './App.css'
class App extends React.Component{
    constructor(props){
        super(props);
        this.viewer = null;
        this.img = imgurl;
    }
    render(){
        return (
            <div id='cesium-container'>
            </div>
        );
    }
    componentDidMount(){
        this.viewer = new Cesium.Viewer('cesium-container',{
            // animation:false,
            // baseLayerPicker:true,
            // fullscreenButton:true,
            // geocoder:true,
            // homeButton:true,
            // infoBox:false,
            // sceneModePicker:false,
            // selectionIndicator:false,
            // timeline:true,
            // navigationHelpButton:true,
            // navigationInstructionsInitiallyVisible:true
        }); 
            // 去掉默认的logo
    this.viewer._cesiumWidget._creditContainer.style.display = 'none';
    // this.viewer.canvas.style.width='100%';
    window['viewer'] = this.viewer;
    }
}
export default hot(module)(App);