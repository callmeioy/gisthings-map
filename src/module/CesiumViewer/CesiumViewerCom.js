/* eslint-disable react/prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import imgurl from '@assets/img/a.png';
import { hot } from 'react-hot-loader';
import './CesiumViewer.scss';
import { ViewerService } from '@src/services/ViewerService';
import { ComponentModuleList } from '@src/module/ComponentModuleList';
import { Switch } from 'antd';

class CesiumViewerCom extends React.Component {
    viewer = null;
    img = imgurl;
    constructor(props) {
        super(props);
        // TODO: 以后这里可以做功能可配置, 结合redux
        this.state = {
            funcList: ComponentModuleList.list
        };
    }
    render() {
        return (
            <div id='cesium-container'>
                <div id='func-list'>
                    <FuncComList list={this.state.funcList} func={this.funcSwitchChange}></FuncComList>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.viewer = ViewerService.createViewer({ domId: 'cesium-container', isDefaultViewer: true });
    }

    /**
     * 功能组件打开
     * @param {*} item 功能选项
     * @param {*} switchVal 是否打开
     */
    funcSwitchChange(item, switchVal) {
        const cContainerDiv = document.getElementById('cesium-container');
        console.log(item, switchVal);
        if (switchVal) {
            const parentDom = document.createElement('DIV');
            parentDom.id = item.parentDomId;
            parentDom.classList.add('com-ui-container');
            cContainerDiv.appendChild(parentDom);
            ReactDOM.render(
                <item.component></item.component>,
                document.getElementById(item.parentDomId)
            );
        } else {
            const parentDom = document.getElementById(item.parentDomId);
            ReactDOM.unmountComponentAtNode(parentDom);
            // 关闭的话移除 dom
            const doms = document.querySelectorAll('#cesium-container > div');
            for (let i = 0; i < doms.length;i++) {
                if(doms[i].getAttribute('id') === item.parentDomId){
                    doms[i].remove();
                    break;
                }
            }
              }

    }

}

function FuncComList(props) {
    const listItems = props.list.map(item =>
        <li key={item.id}> <Switch  checkedChildren={item.text + '开'} unCheckedChildren={item.text + '关'} onChange={props.func.bind(this, item)} /></li>
    );

    return (
        <ul>{listItems}</ul>
    );
}
hot(module)(CesiumViewerCom);
export { CesiumViewerCom };
