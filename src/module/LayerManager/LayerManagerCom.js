import React from 'react';
import {hot} from 'react-hot-loader';
import { Input } from 'antd';
import './component.scss';
import {ViewerService} from '@src/services/ViewerService.js';
import {LayerService} from'@src/services/LayerService.js';

class LayerManagerCom extends React.Component {
  viewer = null;
  constructor(props){
    super(props);
    // 状态
    this.state= {
      url: 'http://172.16.10.221:8080/3DFiles/modeldata/changyuanchengqu/tileset.json'
    };
  }
  urlChange(e){
    const {value} = e.target;
    console.log(value);
    this.setState({
      url: value
    });
  }
  componentDidMount(){
    this.viewer = ViewerService.getViewer();
  }
  addLayer(e){
    let options = {url: this.state.url, type:'IMAGERY',show: true,location:true};
    LayerService.addLayer(options);
  }

  render(){
    return (
      <div id='layer-manager' >
        <Input placeholder="输入素材服务地址" defaultValue ={this.state.url} onChange ={this.urlChange.bind(this)} onPressEnter = {this.addLayer.bind(this)} />

      </div>
    );
  }
}
// export  default hot(module) (LayerManagerCom);
hot(module) (LayerManagerCom);
export  {LayerManagerCom};
