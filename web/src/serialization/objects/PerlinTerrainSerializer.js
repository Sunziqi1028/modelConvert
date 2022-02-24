
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';
import PerlinTerrain from '../../object/terrain/PerlinTerrain';

/**
 * PerlinTerrainSerializer
 
 */
class PerlinTerrainSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        return json;
    }

    fromJSON(json, parent) { // eslint-disable-line
        var terrain = new PerlinTerrain(
            json.userData.width,
            json.userData.depth,
            json.userData.widthSegments,
            json.userData.depthSegments,
            json.userData.quality
        );

        Object3DSerializer.prototype.fromJSON.call(this, json, terrain);

        return terrain;
    }
}

export default PerlinTerrainSerializer;