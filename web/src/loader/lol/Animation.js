
import AnimationBone from './AnimationBone';

/**
 * @author lolking / http://www.lolking.net/models
 
 * @param {Model} model 模型
 * @param {DataView2} r 数据视图
 * @param {Number} version 版本
 */
class Animation {
    constructor(model, r, version) {
        var self = this,
            i;
        self.model = model;
        self.meshOverride = {};
        self.name = r.getString().toLowerCase();
        self.fps = r.getInt32();
        var numBones = r.getUint32();
        self.bones = new Array(numBones);
        self.lookup = {};
        for (i = 0; i < numBones; ++i) {
            self.bones[i] = new AnimationBone(model, self, r, version);
            self.lookup[self.bones[i].bone] = i;
        }
        if (numBones === 0 || self.fps <= 1) {
            self.duration = 1e3;
        } else {
            self.duration = Math.floor(1e3 * (self.bones[0].frames.length / self.fps));
        }
    }
}

export default Animation;