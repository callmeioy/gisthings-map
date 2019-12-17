import * as Cesium from '@cesium/Cesium'
// import {Viewer,Ion,createWorldTerrain,viewerCesium3DTilesInspectorMixin} from '@cesium/Cesium'
import _ from 'lodash'
import uuidv1 from 'uuid/v1'

class ViewerService {
  static viewers = [];
  static defaultViewer = null;
  constructor(options){
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4ZDdhNmRjMC0yNGMxLTRlYWItYjU5Ny1jZjJjZWIyNWI2YmIiLCJpZCI6NzY2Niwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU1MDExMjI4NH0.e_LkplBoPjo_fSqLsGAb97ypotS0G5tMHJoSxLkqyUw";
  }
  static createViewer(options){
    let {domId,isDefaultViewer} = options;
    
    if(!domId) {
      console.error('请传入domId');
      return false;
    }

    let viewer = new Cesium.Viewer(domId,{
      geocoder:false,
      // terrainProvider: Cesium.createWorldTerrain({
      //   requestWaterMask:true
      // }),
        // animation:false,
        // baseLayerPicker:true,
        // fullscreenButton:true,
        // homeButton:true,
        // infoBox:false,
        // sceneModePicker:false,
        // selectionIndicator:false,
        // timeline:true,
        // navigationHelpButton:true,
        // navigationInstructionsInitiallyVisible:true
    }); 
    let viewerId = uuidv1();
    // 去掉默认的logo
    viewer._cesiumWidget._creditContainer.style.display = 'none';
    viewer['viewerId'] = viewerId;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    // 3dTileset 属性调试板块
    // viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
    // let inspectorViewModel = viewer.cesium3DTilesInspector.viewModel;

    if(isDefaultViewer){
      ViewerService.defaultViewer = viewer;
      let v = ViewerService.viewers.find(v => v.isDefaultViewer === true); // 重置旧的默认 
      if(v) v.isDefaultViewer = false;
    } 
    ViewerService.viewers.push({viewer,viewerId,isDefaultViewer});
    // debug
    window.ViewerService = ViewerService;
    window.viewer = viewer;
    viewer.scene.debugShowFramesPerSecond =true;

    return viewer;
  } 
  static setDefaultViewer(viewerId) {
    if(!viewerId) {
      console.warn('请传入viewerId值');
      return false;
    }
    let oDefaultV =ViewerService.viewers.find(v => v.isDefaultViewer ===true);
    if(oDefaultV) oDefaultV.isDefaultViewer = false;
    let nDefaultV = ViewerService.viewers.find(v => v.viewerId === viewerId);
    if(!nDefaultV) {
      console.warn('没有VieweId: ' + viewerId +'的Viewer,请检查ViewerId');
      return false
    }
    nDefaultV.isDefaultViewer = true;
    ViewerService.defaultViewer = nDefaultV.viewer;
  }
  static getViewer(viewerId){
    if(!viewerId){  // 默认viewer
      if(!ViewerService.defaultViewer){
        console.warn('请先创建Viewer')
        return null;
      } 
      return ViewerService.defaultViewer;
    }
    
    let v= ViewerService.viewers.find(v => v.viewerId === viewerId );
    if (!v) {
      console.warn('没有ViewerId为:' + viewerId +'的viewer,请检查viewerId');
    }
    return v;
  }
}
export {ViewerService}