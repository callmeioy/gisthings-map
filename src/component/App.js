import React from 'react';
import imgurl from '@assets/img/a.png'
import {hot} from 'react-hot-loader'
import Cesium from '@cesium/Cesium'
import './App.scss'
// import './count/count.scss'
class App extends React.Component{
    constructor(props){
        super(props);
        this.viewer = null;
        this.img = imgurl;
        console.log('props' ,props)
    }
    render(){
        return (
            <div id='cesium-container'></div>
        );
    }
    componentDidMount(){
        Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDdhNmRjMC0yNGMxLTRlYWItYjU5Ny1jZjJjZWIyNWI2YmIiLCJpZCI6NzY2Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MDExMjI4NH0.e_LkplBoPjo_fSqLsGAb97ypotS0G5tMHJoSxLkqyUw";
        this.viewer = new Cesium.Viewer('cesium-container',{
            // animation:false,
            // baseLayerPicker:true,
            // fullscreenButton:true,
            geocoder:false,
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
        this.viewer.canvas.style.width='100%';
        window['viewer'] = this.viewer;
        console.log('store',this.context.store);
        console.log('ggggggggdfddfgggggg')
        }
}
export default hot(module)(App);