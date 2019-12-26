import {VisualFieldAnalysisCom} from './VisualFieldAnalysis/VisualFieldAnalysisCom'
import {LayerManagerCom} from  '@src/module/LayerManager/LayerManagerCom'


class ComponentModuleList{
 
  static list = [
    {id:0, text:'图层管理',component: LayerManagerCom, icon:'', parentDomId:'layer-container'},
    {id:1, text:'可视域分析',component: VisualFieldAnalysisCom, icon:'' ,parentDomId:'area-visible-analysis-container'},
  ];
  constructor(){

  }

}

export {ComponentModuleList}