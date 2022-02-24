
import BaseHelper from '../BaseHelper';
import VolumePointLightHelper from './VolumePointLightHelper';
import global from '../../global';

/**
 * 点光源帮助器
 
 */
class PointLightHelpers extends BaseHelper {
    constructor() {
        super();
        this.helpers = [];
    }

    start() {
        global.app.on(`objectAdded.${this.id}`, this.onObjectAdded.bind(this));
        global.app.on(`objectRemoved.${this.id}`, this.onObjectRemoved.bind(this));
        global.app.on(`objectChanged.${this.id}`, this.onObjectChanged.bind(this));
        global.app.on(`storageChanged.${this.id}`, this.onStorageChanged.bind(this));
    }

    stop() {
        global.app.on(`objectAdded.${this.id}`, null);
        global.app.on(`objectRemoved.${this.id}`, null);
        global.app.on(`objectChanged.${this.id}`, null);
        global.app.on(`storageChanged.${this.id}`, null);
    }

    onObjectAdded(object) {
        if (!object.isPointLight) {
            return;
        }

        var helper = new VolumePointLightHelper(object, 1);

        helper.visible = global.app.storage.showPointLight;

        this.helpers.push(helper);

        global.app.editor.sceneHelpers.add(helper);
    }

    onObjectRemoved(object) {
        if (!object.isPointLight) {
            return;
        }

        var index = this.helpers.findIndex(n => {
            return n.light === object;
        });

        if (index === -1) {
            return;
        }

        global.app.editor.sceneHelpers.remove(this.helpers[index]);

        this.helpers[index].dispose();

        this.helpers.splice(index, 1);
    }

    onObjectChanged(object) {
        if (!object.isPointLight) {
            return;
        }

        var index = this.helpers.findIndex(n => {
            return n.light === object;
        });

        if (index === -1) {
            return;
        }

        this.helpers[index].update();
    }

    onStorageChanged(key, value) {
        if (key !== 'showPointLight') {
            return;
        }

        this.helpers.forEach(n => {
            n.visible = value;
        });
    }
}

export default PointLightHelpers;