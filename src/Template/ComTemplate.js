import React from 'react';
import {hot} from 'react-hot-loader'
/**
 * react 组件模板
 */
class ComTemplate extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
    
  }

  render(){
    return (
      <div id= 'xxxx'></div>
    );
  }
}
hot(module) (ComTemplate)
export  {ComTemplate} ;