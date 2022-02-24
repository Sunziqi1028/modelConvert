
import BaseEvent from './BaseEvent';
import EffectRenderer from '../render/EffectRenderer';
import global from '../global';

/**
 * 渲染事件
 
 */
class RenderEvent extends BaseEvent {
    constructor() {
        super();
        this.clock = new THREE.Clock();

        this.running = true;

        this.render = this.render.bind(this);
        this.createRenderer = this.createRenderer.bind(this);
        this.handleAppStarted = this.handleAppStarted.bind(this);
        this.onViewChanged = this.onViewChanged.bind(this);
    }

    start() {
        this.running = true;
        global.app.on(`appStarted.${this.id}`, this.handleAppStarted);
        global.app.on(`viewChanged.${this.id}`, this.onViewChanged);
    }

    stop() {
        this.running = false;
        global.app.on(`appStarted.${this.id}`, null);
        global.app.on(`viewChanged.${this.id}`, null);
    }

    handleAppStarted() {
        global.app.editor.renderer.setAnimationLoop(this.render);
    }

    render() {
        if (global.app.options.sceneType === 'GIS') {
            return;
        }

        if (!this.running) {
            return;
        }

        const {scene, sceneHelpers} = global.app.editor;

        this.clock._getDelta(); // see: ../polyfills.js

        const deltaTime = this.clock.getDelta();

        global.app.call('animate', this, this.clock, deltaTime);

        global.app.stats.begin();

        scene.updateMatrixWorld();
        sceneHelpers.updateMatrixWorld();

        global.app.editor.renderer.clear();

        global.app.call('beforeRender', this, this.clock, deltaTime);

        if (this.renderer === undefined) {
            this.createRenderer().then(() => {
                this.render();
            });
            global.app.on(`sceneLoaded.${this.id}`, this.createRenderer);
            global.app.on(`postProcessingChanged.${this.id}`, this.createRenderer);
            return;
        } else {
            this.renderer.render();
        }

        global.app.call('afterRender', this, this.clock, deltaTime);

        global.app.stats.end();
    }

    createRenderer() {
        const {scene, sceneHelpers, camera, renderer} = global.app.editor;

        this.renderer = new EffectRenderer();

        if (global.app.editor.view === 'perspective') {
            if (global.app.objuuid) {
                global.app.editor.focusByUUID(global.app.objuuid);
            }
        }
        
        return this.renderer.create(
            [scene, sceneHelpers],
            global.app.editor.view === 'perspective' ? camera : global.app.editor.orthCamera,
            renderer
        );
    }

    onViewChanged() {
        this.createRenderer();
    }
}

export default RenderEvent;