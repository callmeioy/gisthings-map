import {ViewerService} from '@src/services/ViewerService'
class VisualFieldAnalysisService{
  viewer = null;
	constructor(options){
	}

	init() {
    if(!viewer) this.init.viewer = ViewerService.getViewer();
	}

	createFrustum() {
		console.log('createFrustum',this.viewer);
	}

	destroy(){
		console.log('destory',this);
	}
}
export {VisualFieldAnalysisService}