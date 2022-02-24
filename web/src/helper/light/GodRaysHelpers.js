
import BaseHelper from '../BaseHelper';
import GodRays from '../../postprocessing/GodRays';
import global from '../../global';

/**
 * 神光帮助器
 
 */
class GodRaysHelpers extends BaseHelper {
    constructor() {
        super();
    }

    start() {
        this.ready = false;
        this.ray = new GodRays();
        this.ray.init(global.app.editor.scene, global.app.editor.camera, global.app.editor.renderer).then(() => {
            this.ready = true;
        });
        global.app.on(`afterRender.${this.id}`, this.onAfterRender.bind(this));
    }

    stop() {
        this.ready = false;
        this.ray.dispose();
        global.app.on(`afterRender.${this.id}`, null);
    }

    onAfterRender() {
        if (!this.ready) {
            return;
        }
        this.ray.render();
    }
}

export default GodRaysHelpers;