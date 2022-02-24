
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from './Object3DSerializer';

import MaterialsSerializer from '../material/MaterialsSerializer';

/**
 * SpriteSerializer
 
 */
class SpriteSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        json.center = obj.center;
        json.material = new MaterialsSerializer().toJSON(obj.material);
        json.z = obj.z;
        json.isSprite = obj.isSprite;

        return json;
    }

    fromJSON(json, parent, server) {
        var material;

        if (parent === undefined) {
            if (!json.material) {
                console.warn(`SpriteSerializer: ${json.name} json.material is not defined.`);
                return null;
            }
            material = new MaterialsSerializer().fromJSON(json.material, undefined, server);
        }

        var obj = parent === undefined ? new THREE.Sprite(material) : parent;

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        obj.center.copy(json.center);
        obj.z = json.z;

        return obj;
    }
}

export default SpriteSerializer;