import React from 'react'
import ReactDOM from 'react-dom';
import imgurl from '@assets/img/a.png'
import { hot } from 'react-hot-loader'
import './CesiumViewer.scss'
import { ViewerService } from '@src/services/ViewerService'
import { ComponentModuleList } from '@src/module/ComponentModuleList'
import {LayerManagerCom} from  '@src/module/LayerManager/LayerManagerCom'
import { Switch } from 'antd';
// import './count/count.scss'

class CesiumViewerCom extends React.Component {
    constructor(props) {
        super(props)
        this.viewer = null
        this.img = imgurl
        // TODO: 以后这里可以做功能可配置, 结合redux
        this.state = {
            funcList: ComponentModuleList.list
        }
    }
    render() {
        return (
            <div id='cesium-container'>
                <LayerManagerCom></LayerManagerCom>
                <div id='func-list'>
                    <FuncComList list= {this.state.funcList}></FuncComList>
                </div>
            </div>
        )
    }
    componentDidMount() {
        this.viewer = ViewerService.createViewer({ domId: 'cesium-container', isDefaultViewer: true });
        // Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDdhNmRjMC0yNGMxLTRlYWItYjU5Ny1jZjJjZWIyNWI2YmIiLCJpZCI6NzY2Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MDExMjI4NH0.e_LkplBoPjo_fSqLsGAb97ypotS0G5tMHJoSxLkqyUw";
        // this.viewer = new Viewer('cesium-container',{
        //     // animation:false,
        //     // baseLayerPicker:true,
        //     // fullscreenButton:true,
        //     geocoder:false,
        //     // homeButton:true,
        //     // infoBox:false,
        //     // sceneModePicker:false,
        //     // selectionIndicator:false,
        //     // timeline:true,
        //     // navigationHelpButton:true,
        //     // navigationInstructionsInitiallyVisible:true
        // }); 
        //     // 去掉默认的logo
        // this.viewer._cesiumWidget._creditContainer.style.display = 'none';
        // this.viewer.canvas.style.width='100%';
        // window['viewer'] = this.viewer;
        // console.log('store',this.context.store);
        // console.log("3342342424")
    }

}

function FuncComList(props) {
    const listItems = props.list.map(item => 
        <li key = {item.id}> <Switch checkedChildren= {item.text + "开"}  unCheckedChildren={item.text + "关"}  /></li>
    );

    return (
        <ul>{listItems}</ul>
    );
}
// const CesiumViewerCom = hot(module)(CesiumViewerCom);
export default hot(module)(CesiumViewerCom)
// hot(module)(CesiumViewerCom)
// export {CesiumViewerCom}