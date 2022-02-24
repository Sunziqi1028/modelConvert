
import BaseSerializer from '../BaseSerializer';

/**
 * OptionsSerializer
 
 */
class OptionsSerializer extends BaseSerializer {
    toJSON(obj) {
        var json = BaseSerializer.prototype.toJSON.call(this, obj);
        Object.assign(json, obj);
        return json;
    }

    fromJSON(json) {
        var obj = {};

        Object.keys(json).forEach(n => {
            if (n === '_id' || n === 'metadata' || n === 'server') { // 由于不同服务器的服务端不一样，所以不能反序列化server配置
                return;
            }
            obj[n] = json[n];
        });

        return obj;
    }
}

export default OptionsSerializer;