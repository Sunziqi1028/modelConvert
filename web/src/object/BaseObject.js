
/**
 * 物体基类
 * @constructor
 * @description 物体不需要继承该类，该类仅仅用来说明物体上的通用方法。
 */
class BaseObject extends THREE.Object3D {
    /**
     * 创建类前调用，用于下载创建物体所需的类
     * @returns {Promise} 下载Promise
     */
    load() {
        return new Promise(resolve => {
            resolve();
        });
    }
}

export default BaseObject;