import React from 'react'
import ReactDOM from 'react-dom';
import imgurl from '@assets/img/a.png'
import { hot } from 'react-hot-loader'
import './CesiumViewer.scss'
import { ViewerService } from '@src/services/ViewerService'
import { ComponentModuleList } from '@src/module/ComponentModuleList'
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
                <div id='func-list'>
                    <FuncComList list= {this.state.funcList} func={this.funcSwitchChange}></FuncComList>
                </div>
                <div id ='func-component-container'></div>
            </div>
        )
    }
    componentDidMount() {
        this.viewer = ViewerService.createViewer({ domId: 'cesium-container', isDefaultViewer: true });
    }

    /**
     * 
     * @param {*} item 
     * @param {*} switchVal 
     */
    funcSwitchChange(item,switchVal){
        console.log(item,switchVal);
        if(switchVal) {
            ReactDOM.render(
                <item.component></item.component>,
                document.getElementById('func-component-container')
            );
        }else {
            ReactDOM.unmountComponentAtNode(document.getElementById('func-component-container'));
        }
        
    }

}

function FuncComList(props) {
    const listItems = props.list.map(item => 
        <li key = {item.id}> <Switch checkedChildren= {item.text + "开"}  unCheckedChildren={item.text + "关"} onChange ={props.func.bind(this,item)} /></li>
    );

    return (
        <ul>{listItems}</ul>
    );
}
hot(module)(CesiumViewerCom)
export {CesiumViewerCom}