
import BaseSerializer from '../BaseSerializer';

/**
 * AnimationSerializer
 
 */
class AnimationSerializer extends BaseSerializer {
    toJSON(list) {
        var jsons = [];

        list.forEach(n => {
            var json = BaseSerializer.prototype.toJSON.call(this, n);
            Object.assign(json, n);
            jsons.push(json);
        });

        return jsons;
    }

    fromJSON(jsons) {
        var list = [];

        jsons.forEach(n => {
            var obj = Object.assign({}, n);
            delete obj.metadata;
            list.push(obj);
        });

        return list;
    }
}

export default AnimationSerializer;