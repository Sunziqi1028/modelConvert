
import BaseSerializer from '../BaseSerializer';
import TextureSerializer from './TextureSerializer';

/**
 * VideoTextureSerializer
 
 */
class VideoTextureSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = TextureSerializer.prototype.toJSON.call(this, obj);

        json.image = {
            tagName: 'video',
            src: obj.image.src.replace(location.href, '/')
        };

        return json;
    }

    fromJSON(json, parent, server) {
        let video = document.createElement('video');
        video.setAttribute('src', server + json.image.src);
        video.setAttribute('autoplay', 'autoplay');
        video.setAttribute('loop', 'loop');
        video.setAttribute('crossorigin', 'anonymous');

        var obj = parent === undefined ? new THREE.VideoTexture(video) : parent;

        TextureSerializer.prototype.fromJSON.call(this, json, obj, server);

        return obj;
    }
}

export default VideoTextureSerializer;