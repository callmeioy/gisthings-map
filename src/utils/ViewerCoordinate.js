class  ViewerCoordinate {
  /**
   * 通过屏幕坐标点 拾取场景位置信息
   * @param {{position:Cartesian2}} screenCoordinate 屏幕坐标
   * @param {Cesium.viewer} viewer 具体场景viewer
   * @return {Cartesian3} 笛卡尔空间坐标点
   */
 static getPosition(screenCoordinate, viewer) {
   if (screenCoordinate && viewer) {
     const cartesian = viewer.scene.pickPosition(screenCoordinate.position);
     if (cartesian) {
       const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
       if (cartographic.height < 0) {
         const ray = viewer.camera.getPickRay(screenCoordinate.position);
         return viewer.scene.globe.pick(ray, viewer.scene);
       } else {
         return cartesian;
       }
     } else {
       return viewer.camera.pickEllipsoid(screenCoordinate.position, viewer.scene.globe.ellipsoid);
     }
   }
   return null;
 }
}

export {ViewerCoordinate}