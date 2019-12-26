
import {ViewerService} from '@src/services/ViewerService.js'
import {Cesium3DTileset} from '@cesium/Cesium'

class LayerService{
	static viewer = null
	constructor(){
		 if(!this.viewer) {
			this.viewer = ViewerService.getViewer();
		}
	}

	static instance(name) {
		if(!this.instance){
			this.instance = new A(name)
		}
		return this.instance
	}
	static addLayer(options) {
		switch (options.type) {
			case 'IMAGERY' : LayerService.add3dTileset(options);
				break;
		}
	}
	static add3dTileset(options){
		if(!ViewerService.viewer) {
			ViewerService.viewer = ViewerService.getViewer();
			if(!ViewerService.viewer) {console.error('获取不到viewer，请先使用 ViewerService.getViewer() 获取当前viewer ')}
			return;
		}

		if(options.url.length ===0) {console.error('请输入地址')}
		let  tileset =ViewerService.viewer.scene.primitives.add(new Cesium3DTileset({
			url: options.url,
			show: options.show,
			maximumScreenSpaceError: 2,
			})
		)

		// 加载成功
		tileset.readyPromise.then( t =>{

			options.location && ViewerService.viewer.flyTo(tileset,{duration: 0.5});
			console.info('%c 加载成功','color:green',t);
		})

		// 加载失败
		tileset.readyPromise.otherwise(t =>{
			console.warn('%c 加载失败','color:red');
		})

		return tileset;

	}

}
export {LayerService}