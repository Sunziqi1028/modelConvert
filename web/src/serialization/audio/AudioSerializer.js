
import BaseSerializer from '../BaseSerializer';
import Object3DSerializer from '../core/Object3DSerializer';

/**
 * AudioSerializer
 
 */
class AudioSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = Object3DSerializer.prototype.toJSON.call(this, obj);

        json.autoplay = obj.autoplay;
        json.loop = obj.getLoop();
        json.volume = obj.getVolume();

        return json;
    }

    fromJSON(json, parent, audioListener) {
        if (audioListener === undefined) {
            audioListener = new THREE.AudioListener();
        }
        var obj = parent === undefined ? new THREE.Audio(audioListener) : parent;

        Object3DSerializer.prototype.fromJSON.call(this, json, obj);

        obj.autoplay = json.autoplay;
        obj.setLoop(json.loop);
        obj.setVolume(json.volume);

        return obj;
    }
}

export default AudioSerializer;