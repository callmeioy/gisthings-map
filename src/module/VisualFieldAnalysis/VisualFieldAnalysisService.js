import { ViewerService } from '@src/services/ViewerService';
import * as Cesium from '@cesium/Cesium';
// import { CameraPrimitiveExtra } from './CameraPrimitiveExtra';
import { ViewerCoordinate } from '@src/utils/ViewerCoordinate.js';
import uuidv1 from 'uuid/v1';
class VisualFieldAnalysisService{
  viewer = null;
	sseHandler = null;
	isFirstClick = true;
	isAddFrustum = false;
	frustums = [];
	curentFrustums = {};
	visualFieldPrimitiveLayer = null;
  viewPointEntityLayer = null;
  init() {
		if (!this.viewer) this.viewer = ViewerService.getViewer();
		this.sseHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		this.visualFieldPrimitiveLayer = this.viewer.scene.primitives.add(new Cesium.PrimitiveCollection());
		this.viewPointEntityLayer = this.viewer.entities.add(new Cesium.Entity());
		this.sseHandler.setInputAction(screenCoordinate => {
			let posCartesion3 = ViewerCoordinate.getPosition(screenCoordinate, this.viewer);
			if (this.isAddFrustum) {
				console.log('绘制');
				if (this.isFirstClick) {
					this.createFrustum('视点1', posCartesion3);
				} else {
					// 结束视锥体绘制，弹出设置窗口
					console.log('结束视锥体绘制，弹出设置窗口', posCartesion3)
					window.document.body.style.cursor = 'auto';
					this.frustums.push(this.curentFrustums);
					this.curentFrustums = {};
					this.isAddFrustum = false;
					this.isFirstClick = true;
				}
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  clear() {
		this.frustums = [];
		// 场景也清除
		this.visualFieldPrimitiveLayer.removeAll();
		// this.viewPointEntityLayer.removeAll();

	}
	deleteFrustum() {
		// TODO: 删除单个视锥体
	}
	openCreate() {
		this.isAddFrustum = true;
		window.document.body.style.cursor = 'crosshair';
  }
  createFrustum(viewPointText, position) {
		let camera = new Cesium.Camera(this.viewer.scene);
		// alert(position.toString())
		position.toString()
		console.log('position', position)
		camera.position = position;
		camera.direction = Cesium.Cartesian3.negate(Cesium.Cartesian3.UNIT_Z, new Cesium.Cartesian3());
		camera.up = Cesium.Cartesian3.clone(Cesium.Cartesian3.UNIT_Y);
		camera.frustum.fov = Cesium.Math.PI_OVER_THREE;
		camera.frustum.near = 1.0;
		camera.frustum.far = 2.0;
		this.curentFrustums['uuid'] = uuidv1();
		this.curentFrustums['originPosition'] = position;
		this.curentFrustums['camera'] = camera;

		// 绘制camera 视锥点
		this.curentFrustums['viewPointEntity'] = this.viewer.entities.add({
			parent: this.viewPointEntityLayer,
			position,
			point: {
				position,
				pixelSize: 10,
				color: Cesium.Color.DODGERBLUE,
				outlineColor: Cesium.Color.WHITE,
				outlineWidth: 2.0,
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
			},
			label: {
				text: viewPointText,
				font: '18px ',
				pixelOffset: new Cesium.Cartesian2(0, -30),
				disableDepthTestDistance: Number.POSITIVE_INFINITY,
				horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
				fillColor: new Cesium.Color(0, 1, 1, 1),
			}
		});
		// 视锥体
		this.curentFrustums['frustum'] = new Cesium.DebugCameraPrimitive({
			camera,
			color: Cesium.Color.YELLOW
		});


		console.log('绘制第一个camera点', position);
		// this.visualFieldPrimitiveLayer.add(this.curentFrustums['frustums']);
		// this.viewer.scene.primitives.add(this.curentFrustums.frustum)
		this.isFirstClick = false;
	}

	destroy() {
		console.log('destory', this);
	}

}

export{VisualFieldAnalysisService}