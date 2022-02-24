
import BaseEvent from './BaseEvent';
import OrthographicCameraControls from '../controls/OrthographicCameraControls';
import global from '../global';

/**
 * 视图事件
 
 */
class ViewEvent extends BaseEvent {
    constructor() {
        super();
        this.changeView = this.changeView.bind(this);
    }

    start() {
        global.app.on(`changeView.${this.id}`, this.changeView);
    }

    stop() {
        global.app.on(`changeView.${this.id}`, null);
    }

    changeView(view) {
        if (view === global.app.editor.view) {
            return;
        }

        global.app.editor.view = view;

        if (this.controls === undefined) {
            this.controls = new OrthographicCameraControls(global.app.editor.orthCamera, global.app.editor.renderer.domElement);
        }

        if (view === 'perspective') {
            global.app.editor.controls.enable();
            global.app.editor.showViewHelper = true;
            this.controls.disable();
            global.app.call(`viewChanged`, this, view);
            return;
        }

        let camera = global.app.editor.orthCamera;

        // 使用透视相机离原点最远距离设置正交相机
        let distance = Math.max(
            global.app.editor.camera.position.x,
            global.app.editor.camera.position.y,
            global.app.editor.camera.position.z
        );

        switch (view) {
            case 'front':
                camera.position.set(1, 0, 0);
                camera.lookAt(new THREE.Vector3());
                break;
            case 'side':
                camera.position.set(0, 0, 1);
                camera.lookAt(new THREE.Vector3());
                break;
            case 'top':
                camera.position.set(0, 1, 0);
                camera.lookAt(new THREE.Vector3());
                break;
        }
        // camera.position.z = 300;
        // console.log(camera.near, camera.far, camera.position.z);
        // camera.near = 0.01;
        // camera.far = 30000;

        // const scene = global.app.editor.scene;
        // scene.traverse(function (object) {
        //                     // get obj scale
        //                     let scale = object.scale;
        //                     console.log('old:', object.scale);
        //                     // 放大100倍
        //                     object.scale.set(scale.x * 100, scale.y * 100, scale.z * 100);
        //     // if (object.type == 'Group') {

        //     //     console.log('new:', object.scale);
        //     // }
        // });
        camera.zoom = 2000;
        camera.updateProjectionMatrix();

        global.app.editor.select(null);

        global.app.editor.controls.disable();
        global.app.editor.showViewHelper = false;
        this.controls.enable();
        global.app.call(`viewChanged`, this, view);
    }
}

export default ViewEvent;