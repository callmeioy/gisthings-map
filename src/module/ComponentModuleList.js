import {VisualFieldAnalysisCom} from './VisualFieldAnalysis/VisualFieldAnalysisCom'
import {LayerManagerCom} from  '@src/module/LayerManager/LayerManagerCom'


class ComponentModuleList{
 
  static list = [
    {id:0, text:'图层管理',component: LayerManagerCom, icon:''},
    {id:1, text:'可视域分析',component: VisualFieldAnalysisCom, icon:''},
  ];
  constructor(){

  }

}

export {ComponentModuleList}