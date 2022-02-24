
import PlayerComponent from './PlayerComponent';
import EffectRenderer from '../../render/EffectRenderer';

/**
 * 播放器渲染器
 * @param {*} app 播放器
 */
class PlayerRenderer extends PlayerComponent {
    constructor(app) {
        super(app);
    }

    create(scene, camera, renderer) {
        this.renderer = new EffectRenderer();
        return this.renderer.create(scene, camera, renderer);
    }

    update(clock, deltaTime) { // eslint-disable-line
        this.renderer.render();
    }

    dispose() {
        this.renderer.dispose();
        this.renderer = null;
    }
}

export default PlayerRenderer;