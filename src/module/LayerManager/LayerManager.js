import React from 'react';
import {hot} from 'react-hot-loader'
import { Input } from 'antd';
class LayerManager extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){

  }
  addLayer(e){
    
  }

  render(){
    return (
      <div id='layer-manager' >
        <Input placeholder="输入素材服务地址" onPressEnter = {this.addLayer} />
      </div>
    )
  }
}
// export  default hot(module) (LayerManager);
hot(module) (LayerManager)
export  {LayerManager} 