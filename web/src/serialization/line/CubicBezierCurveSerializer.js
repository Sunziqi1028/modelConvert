
import BaseSerializer from '../BaseSerializer';
import MeshSerializer from '../core/MeshSerializer';
import CubicBezierCurve from '../../object/line/CubicBezierCurve';

/**
 * CubicBezierCurveSerializer
 
 */
class CubicBezierCurveSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = MeshSerializer.prototype.toJSON.call(this, obj);

        return json;
    }

    fromJSON(json, parent) {
        json.userData.points = json.userData.points.map(n => {
            return new THREE.Vector3().copy(n);
        });

        var obj = parent || new CubicBezierCurve(json.userData);

        MeshSerializer.prototype.fromJSON.call(this, json, obj);

        return obj;
    }
}

export default CubicBezierCurveSerializer;