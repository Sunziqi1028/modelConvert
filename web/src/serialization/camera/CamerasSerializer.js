
import BaseSerializer from '../BaseSerializer';

import CameraSerializer from './CameraSerializer';
import OrthographicCameraSerializer from './OrthographicCameraSerializer';
import PerspectiveCameraSerializer from './PerspectiveCameraSerializer';

const Serializers = {
    'OrthographicCamera': OrthographicCameraSerializer,
    'PerspectiveCamera': PerspectiveCameraSerializer,
    'Camera': CameraSerializer
};

/**
 * CamerasSerializer
 
 */
class CamerasSerializer extends BaseSerializer {
    toJSON(obj) {
        var serializer = Serializers[obj.constructor.name];

        if (serializer === undefined) {
            console.warn(`CamerasSerializer: No serializer with ${obj.constructor.name}.`);
            return null;
        }

        return new serializer().toJSON(obj);
    }

    fromJSON(json, parent) {
        var generator = json.metadata.generator;

        var serializer = Serializers[generator.replace('Serializer', '')];

        if (serializer === undefined) {
            console.warn(`CamerasSerializer: No deserializer with ${generator}.`);
            return null;
        }

        return new serializer().fromJSON(json, parent);
    }
}

export default CamerasSerializer;