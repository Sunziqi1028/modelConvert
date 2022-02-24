
import TextureSerializer from './TextureSerializer';
import CanvasTextureSerializer from './CanvasTextureSerializer';
import CompressedTextureSerializer from './CompressedTextureSerializer';
import CubeTextureSerializer from './CubeTextureSerializer';
import DataTextureSerializer from './DataTextureSerializer';
import DepthTextureSerializer from './DepthTextureSerializer';
import VideoTextureSerializer from './VideoTextureSerializer';

const Serializers = {
    'CanvasTexture': CanvasTextureSerializer,
    'CompressedTexture': CompressedTextureSerializer,
    'CubeTexture': CubeTextureSerializer,
    'DataTexture': DataTextureSerializer,
    'DepthTexture': DepthTextureSerializer,
    'VideoTexture': VideoTextureSerializer,
    'Texture': TextureSerializer
};

/**
 * TexturesSerializer
 
 */
class TexturesSerializer {
    toJSON(obj) {
        var serializer = Serializers[obj.constructor.name];

        if (serializer === undefined) {
            console.warn(`TexturesSerializer: No serializer with ${obj.type}.`);
            return null;
        }

        return new serializer().toJSON(obj);
    }

    fromJSON(json, parent, server) {
        var generator = json.metadata.generator;

        var serializer = Serializers[generator.replace('Serializer', '')];

        if (serializer === undefined) {
            console.warn(`TexturesSerializer: No deserializer with ${generator}.`);
            return null;
        }

        return new serializer().fromJSON(json, parent, server);
    }
}

export default TexturesSerializer;