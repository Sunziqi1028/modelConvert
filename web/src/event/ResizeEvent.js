
import BaseEvent from './BaseEvent';
import global from '../global';

/**
 * 窗口大小改变事件
 
 */
class ResizeEvent extends BaseEvent {
    constructor() {
        super();
    }

    start() {
        global.app.on(`resize.${this.id}`, this.onResize.bind(this));
    }

    stop() {
        global.app.on(`resize.${this.id}`, null);
    }

    onResize() {
        let {editor, viewport} = global.app;
        let {DEFAULT_CAMERA, camera, orthCamera, renderer} = editor;

        const width = viewport.clientWidth;
        const height = viewport.clientHeight;

        if (this.width === undefined || this.height === undefined) {
            this.width = width;
            this.height = height;
        }

        DEFAULT_CAMERA.aspect = width / height;
        DEFAULT_CAMERA.updateProjectionMatrix();

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        if (width !== this.width) {
            let dwidth = (orthCamera.right - orthCamera.left) * (width / this.width - 1);

            orthCamera.left -= dwidth / 2;
            orthCamera.right += dwidth / 2;

            this.width = width;
        }

        if (height !== this.height) {
            let dheight = (orthCamera.top - orthCamera.bottom) * (height / this.height - 1);

            orthCamera.top += dheight / 2;
            orthCamera.bottom -= dheight / 2;

            this.height = height;
        }

        orthCamera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }
}

export default ResizeEvent;