import React from 'react';
import {hot} from 'react-hot-loader';
import { Button } from 'antd';
import {VisualFieldAnalysisService} from './VisualFieldAnalysisService';
import './VisualFieldAnalysis.scss';

/**
 * react 组件模板
 */
class VisualFieldAnalysisCom extends React.Component {
  constructor(props){
    super(props);
    this.visualFieldAnalysisService = null;
  }

  createFrustum(e){
    this.visualFieldAnalysisService.openCreate()
  }

  clear(e) {
    this.visualFieldAnalysisService.clear();
  }

  componentDidMount(){
    window.service = this.visualFieldAnalysisService = new VisualFieldAnalysisService();
    this.visualFieldAnalysisService.init();
  }

  componentWillUnmount() {
    this.VisualFieldAnalysisService.destroy();
  }
  render(){
    return (
      <div id = 'visual-field-analysis'>
          <Button type="primary" onClick= {this.createFrustum.bind(this)}>创建视锥体</Button>
          <Button type="primary" onClick= {this.clear.bind(this)}>清除</Button>
      </div>
    );
  }
}
hot(module) (VisualFieldAnalysisCom);
export  {VisualFieldAnalysisCom};
