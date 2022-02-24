/**
 * 配置选项
 * @param {*} options 配置选项
 */
class Options {
    constructor(options = {}) {
        // 服务端配置
        this.server = options.server === undefined ? location.origin : options.server; // 服务端地址

        if (!this.server.startsWith('http') && this.server !== '.') {
            this.server = `//${this.server}`;
        }

        this.sceneType = options.sceneType === undefined ? 'Empty' : options.sceneType; // 场景类型：Empty, GIS

        // whether to fetch satellite and terrain tile from server.
        // TODO: replace `||` with `??` some day in the future.
        this.enableCache = options.enableCache || false;

        // 场景优化选项

        // 是否保存模型内部子组件
        this.saveChild = options.saveChild === undefined ? true : options.saveChild;

        // 是否保存模型内部子组件材质
        this.saveMaterial = options.saveMaterial === undefined ? true : options.saveMaterial;

        // 阴影配置
        this.shadowMapType = THREE.PCFSoftShadowMap;

        // gamma校正
        // this.gammaInput = false;
        // this.gammaOutput = false;
        this.gammaFactor = 2.0;

        // 滤镜
        this.hueRotate = 0;
        this.saturate = 1;
        this.brightness = 1;
        this.blur = 0;
        this.contrast = 1;
        this.grayscale = 0;
        this.invert = 0;
        this.sepia = 0;
        // 物理引擎
        this.enablePhysics = false; // 是否启用物理引擎

    }
}

export default Options;