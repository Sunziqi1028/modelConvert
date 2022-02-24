
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from './Object3DSerializer';

import GeometriesSerializer from '../geometry/GeometriesSerializer';
import MaterialsSerializer from '../material/MaterialsSerializer';

/**
 * MeshSerializer
 
 */
class MeshSerializer extends BaseSerializer {
    toJSON(obj, options = {}) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        // json.drawMode = obj.drawMode;
        json.geometry = new GeometriesSerializer().toJSON(obj.geometry);

        if (options.saveMaterial) {
            json.material = new MaterialsSerializer().toJSON(obj.material);
        } else {
            json.material = null;
        }

        return json;
    }

    fromJSON(json, parent, server) {
        // 子类创建模型
        if (parent !== undefined) {
            var obj1 = parent;
            Object3DSerializer.prototype.fromJSON.call(this, json, obj1);
            return obj1;
        }

        // 其他模型
        if (!json.geometry) {
            console.warn(`MeshSerializer: ${json.name} json.geometry is not defined.`);
            return null;
        }

        // TODO: 服务端模型，不保存内部组件材质，不要警告。
        // if (!json.material) {
        // console.warn(`MeshSerializer: ${json.name} json.material is not defined.`);
        // return null;
        // }

        var geometry = new GeometriesSerializer().fromJSON(json.geometry);

        var material = json.material ? new MaterialsSerializer().fromJSON(json.material, undefined, server) : new THREE.MeshBasicMaterial();

        var obj = new THREE.Mesh(geometry, material);

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default MeshSerializer;