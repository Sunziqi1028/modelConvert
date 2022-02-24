
/**
 * @author lolking / http://www.lolking.net/models
 
 * @param {Model} model 模型
 * @param {String} url 地址
 */
class Texture {
    constructor(model, url) {
        var self = this;
        self.model = model;
        self.url = url;
        self.texture = null;
        self.load();
    }

    load() {
        var self = this;

        self.texture = new THREE.TextureLoader().load(self.url, function (texture) {
            self.onLoad.call(self, texture);
        });
    }

    onLoad(texture) {
        var self = this;
        texture.flipY = false;
        self.model.material.map = texture;
        self.model.material.needsUpdate = true;

        self.model.dispatch.call('loadTexture');
    }
}

export default Texture;