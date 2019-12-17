import React from 'react';
import {hot} from 'react-hot-loader'
import { Button } from 'antd';
/**
 * react 组件模板
 */
class VisualFieldAnalysisCom extends React.Component {
  constructor(props){
    super(props)
  }

  

  componentDidMount(){
    // <Button type="primary" onClick= {}>创建</Button>
  }

  componentWillUnmount() {
    console.log('component.remove')
  }
  render(){
    return (
      <div id = 'visual-field-analysis'>
          
      </div>
    );
  }
}
hot(module) (VisualFieldAnalysisCom);
export  {VisualFieldAnalysisCom} 