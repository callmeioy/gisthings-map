import React from 'react';
import {hot} from 'react-hot-loader'
import { Button } from 'antd';
import {VisualFieldAnalysisService} from './VisualFieldAnalysisService'

/**
 * react 组件模板
 */
class VisualFieldAnalysisCom extends React.Component {
  visualFieldAnalysisService = null;
  constructor(props){
    super(props)
  }


  createCamera(e){
    this.visualFieldAnalysisService.createFrustum();
  }
  

  componentDidMount(){
    window.service = this.visualFieldAnalysisService = new VisualFieldAnalysisService(); 
  }

  componentWillUnmount() {
    this.visualFieldAnalysisService.destroy();
  }
  render(){
    return (
      <div id = 'visual-field-analysis'>
          <Button type="primary" onClick= {this.createCamera}>创建</Button>
      </div>
    );
  }
}
hot(module) (VisualFieldAnalysisCom);
export  {VisualFieldAnalysisCom} 