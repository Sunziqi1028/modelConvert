
/**
 * 精灵
 * @param {THREE.SpriteMaterial} material 材质
 */
class Sprite extends THREE.Sprite {
    constructor(material = new THREE.SpriteMaterial()) {
        super(material);
        this.name = _t('Sprite');
    }
}

export default Sprite;