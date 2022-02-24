
import BaseHelper from './BaseHelper';
import ArrowVertex from './view/ArrowVertex.glsl';
import ArrowFragment from './view/ArrowFragment.glsl';
import global from '../global';

/**
 * 视角帮助器
 
 */
class ViewHelper extends BaseHelper {
    constructor() {
        super();
    }

    start() {
        this.scene = new THREE.Scene();

        let show = global.app.storage.showViewHelper;

        if (show === undefined) {
            show = true;
            global.app.storage.showViewHelper = true;
        }

        this.show = show;

        this.mesh = this.createMesh();
        this.mesh.frustumCulled = false;
        this.scene.add(this.mesh);

        global.app.on(`storageChanged.${this.id}`, this.onStorageChanged.bind(this));
        global.app.on(`afterRender.${this.id}`, this.onAfterRender.bind(this));
        // global.app.on(`mousedown.${this.id}`, this.onMouseDown.bind(this));
        global.app.on(`resize.${this.id}`, this.onResize.bind(this));
    }

    stop() {
        this.scene.remove(this.mesh);
        delete this.scene;
        delete this.mesh;

        global.app.on(`storageChanged.${this.id}`, null);
        global.app.on(`afterRender.${this.id}`, null);
        // global.app.on(`mousedown.${this.id}`, null);
        global.app.on(`resize.${this.id}`, null);
    }

    createMesh() {
        var geometry = new THREE.ConeBufferGeometry(0.25, 1.0, 16, 16);
        geometry.computeBoundingBox();
        geometry.translate(0, geometry.boundingBox.min.y, 0);

        var geometryPX = geometry.clone();
        geometryPX.rotateZ(Math.PI / 2);

        var geometryNX = geometry.clone();
        geometryNX.rotateZ(-Math.PI / 2);

        var geometryPY = geometry.clone();
        geometryPY.rotateX(Math.PI);

        var geometryNY = geometry.clone();

        var geometryPZ = geometry.clone();
        geometryPZ.rotateX(-Math.PI / 2);

        var geometryNZ = geometry.clone();
        geometryNZ.rotateX(Math.PI / 2);

        geometry = THREE.BufferGeometryUtils.mergeBufferGeometries([
            geometryPX,
            geometryNX,
            geometryPY,
            geometryNY,
            geometryPZ,
            geometryNZ
        ], true);

        var domElement = global.app.editor.renderer.domElement;
        var domWidth = domElement.clientWidth;
        var domHeight = domElement.clientHeight;
        this.z = 16; // 控件中心到相机距离，越远越小

        var fov = global.app.editor.camera.fov;
        var top = this.z * Math.tan(fov * Math.PI / 180 * 0.5); // 到相机垂直距离为z的地方屏幕高度一半
        this.size = (domHeight / (2 * top) + 12) * 2; // 12为留白

        var uniforms = {
            domWidth: {
                type: 'f',
                value: domWidth
            },
            domHeight: {
                type: 'f',
                value: domHeight
            },
            size: {
                type: 'f',
                value: this.size
            },
            z: {
                type: 'f',
                value: this.z
            },
            color: {
                type: 'v3',
                value: new THREE.Vector3(1.0, 0.0, 0.0)
            },
            ambientColor: {
                type: 'v3',
                value: new THREE.Vector3(0.4, 0.4, 0.4)
            },
            lightPosition: {
                type: 'v3',
                value: new THREE.Vector3(10, 10, 10)
            },
            diffuseColor: {
                type: 'v3',
                value: new THREE.Vector3(1.0, 1.0, 1.0)
            },
            shininess: {
                type: 'float',
                value: 30
            }
        };

        var material1 = new THREE.RawShaderMaterial({
            uniforms: THREE.UniformsUtils.clone(uniforms),
            vertexShader: ArrowVertex,
            fragmentShader: ArrowFragment
        });

        var material2 = material1.clone();
        material2.uniforms.color.value = new THREE.Vector3(0.5, 0.5, 0.5);

        var material3 = material1.clone();
        material3.uniforms.color.value = new THREE.Vector3(0.0, 1.0, 0.0);

        var material4 = material1.clone();
        material4.uniforms.color.value = new THREE.Vector3(0.5, 0.5, 0.5);

        var material5 = material1.clone();
        material5.uniforms.color.value = new THREE.Vector3(0.0, 0.0, 1.0);

        var material6 = material1.clone();
        material6.uniforms.color.value = new THREE.Vector3(0.5, 0.5, 0.5);

        return new THREE.Mesh(geometry, [
            material1,
            material2,
            material3,
            material4,
            material5,
            material6
        ]);
    }

    onStorageChanged(key, value) {
        if (key !== 'showViewHelper') {
            return;
        }

        this.show = value;
    }

    onAfterRender() {
        if (!this.show) {
            return;
        }

        if (!global.app.editor.showViewHelper) {
            return;
        }

        let renderer = global.app.editor.renderer;

        // 最后绘制而且清空深度缓冲，保证视角控件不会被其他物体遮挡
        renderer.clearDepth();
        renderer.render(this.scene, global.app.editor.camera);
    }

    onMouseDown(event) {
        if (this.mouse === undefined) {
            this.mouse = new THREE.Vector3();
        }
        if (this.raycaster === undefined) {
            this.raycaster = new THREE.Raycaster();
        }

        var domElement = global.app.editor.renderer.domElement;

        this.mouse.set(
            event.offsetX / domElement.clientWidth * 2 - 1, -event.offsetY / domElement.clientHeight * 2 + 1
        );
        this.raycaster.setFromCamera(this.mouse, global.app.editor.camera);

        // 设置几何体矩阵，将其转换到左上角
        if (this.matrix === undefined) {
            this.matrix = new THREE.Matrix4();
        }

        this.matrix.copy(this.mesh.matrixWorld);

        // 旧：projectionMatrix * modelViewMatrix
        // 新：translateMatrix * projectionMatrix * _modelViewMatrix
        // matrixWorld =

        if (this.screenXY === undefined) {
            this.screenXY = new THREE.Vector3();
        }
        this.screenXY.set(
            (domElement.clientWidth - this.size / 2) / domElement.clientWidth * 2 - 1, -this.size / 2 / domElement.clientHeight * 2 + 1, -this.z
        );

        this.screenXY.unproject(global.app.editor.camera);

        // var obj = this.raycaster.intersectObject(this.mesh)[0];

        // this.mesh.matrixWorld.copy(this.matrix);

        // if (obj) {
        //     var materialIndex = obj.face.materialIndex;
        // }
    }

    onResize() {
        var materials = this.mesh.material;
        var width = global.app.editor.renderer.domElement.width;
        var height = global.app.editor.renderer.domElement.height;
        var fov = global.app.editor.camera.fov;
        var top = this.z * Math.tan(fov * Math.PI / 180 * 0.5); // 到相机垂直距离为z的地方屏幕高度一半
        this.size = (height / (2 * top) + 12) * 2; // 12为留白

        materials.forEach(n => {
            n.uniforms.domWidth.value = width;
            n.uniforms.domHeight.value = height;
            n.uniforms.size.value = this.size;
        });
    }
}

export default ViewHelper;