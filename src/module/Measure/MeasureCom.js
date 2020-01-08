import React from 'react';
import {hot} from 'react-hot-loader'
/**
 * react 组件模板
 */
class MeasureCom extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    
  }

  render(){
    return (
      <div id = 'measure-com'>
        这里是测量测量
      </div>
    );
  }
}
hot(module) (MeasureCom);
export  {MeasureCom} 