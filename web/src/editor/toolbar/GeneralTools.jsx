import { ToolbarSeparator, Button, IconButton, ImageButton, CheckBox,Label, CheckBoxProperty } from '../../ui/index';
import Converter from '../../utils/Converter';
import TimeUtils from '../../utils/TimeUtils';
import Ajax from '../../utils/Ajax';
import GridHelper from '../../helper/GridHelper';
import ViewHelper from '../../helper/ViewHelper';
import StringUtils from '../../utils/StringUtils';
import AddObjectCommand from '../../command/AddObjectCommand';
import global from '../../global';

let recorder = null;

/**
 * 通用工具
 */
class GeneralTools extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'translate',
            view: 'perspective',
            isGridMode: false,
            isFirstPerspective: false,
            export_maps: false,
            is_top: false,
            old_scene_background: null,
            old_width: null,
            old_height: null
        };

        this.handleEnterSelectMode = this.handleEnterSelectMode.bind(this);
        this.handleEnterTranslateMode = this.handleEnterTranslateMode.bind(this);
        this.handleEnterRotateMode = this.handleEnterRotateMode.bind(this);
        this.handleEnterScaleMode = this.handleEnterScaleMode.bind(this);

        this.handlePerspective = this.handlePerspective.bind(this);
        this.handleFrontView = this.handleFrontView.bind(this);
        this.handleSideView = this.handleSideView.bind(this);
        this.handleTopView = this.handleTopView.bind(this);

        this.handleGridMode = this.handleGridMode.bind(this);
        this.handleScreenshot = this.handleScreenshot.bind(this);
        this.handleTopViewScreenshot = this.handleTopViewScreenshot.bind(this);
        this.commitScreenshot = this.commitScreenshot.bind(this);

        this.handleFirstPerspective = this.handleFirstPerspective.bind(this);
        this.handleAddAxesHelper = this.handleAddAxesHelper.bind(this);
        this.handleCenterAxesHelper = this.handleCenterAxesHelper.bind(this);
        this.handleExport = this.handleExport.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { mode, view, isGridMode, isFirstPerspective, export_maps } = this.state;
        const { enableAuthority, authorities } = global.app.server;

        return <>
            <IconButton
                icon={'select'}
                title={_t('Select')}
                selected={mode === 'select'}
                onClick={this.handleEnterSelectMode}
            />
            <IconButton
                icon={'translate'}
                title={_t('Translate')}
                selected={mode === 'translate'}
                onClick={this.handleEnterTranslateMode}
            />
            {/* <IconButton
                icon={'rotate'}
                title={_t('Rotate')}
                selected={mode === 'rotate'}
                onClick={this.handleEnterRotateMode}
            />
            <IconButton
                icon={'scale'}
                title={_t('Scale')}
                selected={mode === 'scale'}
                onClick={this.handleEnterScaleMode}
            /> */}
            <ToolbarSeparator />
            <ImageButton
                src={'assets/image/perspective-view.png'}
                title={_t('Perspective View')}
                selected={view === 'perspective'}
                onClick={this.handlePerspective}
            />
            <ImageButton
                src={'assets/image/front-view.png'}
                title={_t('Front View')}
                selected={view === 'front'}
                onClick={this.handleFrontView}
            />
            <ImageButton
                src={'assets/image/side-view.png'}
                title={_t('Side View')}
                selected={view === 'side'}
                onClick={this.handleSideView}
            />
            <ImageButton
                src={'assets/image/top-view.png'}
                title={_t('Top View')}
                selected={view === 'top'}
                onClick={this.handleTopView}
            />
            <ToolbarSeparator />
            <IconButton
                icon={'grid'}
                title={_t('Grid Mode')}
                selected={isGridMode}
                onClick={this.handleGridMode}
            />
            <ToolbarSeparator />
            <IconButton
                icon={'camera'}
                title={_t('Screenshot')}
                show={!enableAuthority || authorities.includes('ADD_SCREENSHOT')}
                onClick={this.handleScreenshot}
            />
            <ToolbarSeparator />
            {/* <IconButton
                icon={'first-perspective'}
                title={_t('First Perspective')}
                selected={isFirstPerspective}
                onClick={this.handleFirstPerspective}
            />
            <ToolbarSeparator /> */}
            <Button onClick={this.handleAddAxesHelper}>{'添加坐标轴'}</Button>
            <Button onClick={this.handleCenterAxesHelper}>{'添加中心点'}</Button>
            <Button onClick={this.handleExport}>{'导出'}</Button>
            {/* <CheckBoxProperty name={'export_maps'}
                              label={'贴图'}
                              value={export_maps}
                              onChange={this.handleChange}
            /> */}
            <Label>{_t('贴图')}</Label>
            <CheckBox name={'export_maps'}
                      checked={export_maps}
                      onChange={this.handleChange}
            />
        </>;
    }

    // --------------------------------- 选择模式 -------------------------------------

    handleEnterSelectMode() {
        this.setState({ mode: 'select' });
        global.app.call('changeMode', this, 'select');
    }

    handleEnterTranslateMode() {
        this.setState({ mode: 'translate' });
        global.app.call('changeMode', this, 'translate');
    }

    handleEnterRotateMode() {
        this.setState({ mode: 'rotate' });
        global.app.call('changeMode', this, 'rotate');
    }

    handleEnterScaleMode() {
        this.setState({ mode: 'scale' });
        global.app.call('changeMode', this, 'scale');
    }

    // ------------------------------ 视角工具 ------------------------------------------

    handlePerspective() {
        global.app.call(`changeView`, this, 'perspective');
        this.setState({
            view: 'perspective'
        });
    }

    handleFrontView() {
        global.app.call(`changeView`, this, 'front');
        this.setState({
            view: 'front'
        });
    }

    handleSideView() {
        global.app.call(`changeView`, this, 'side');
        this.setState({
            view: 'side'
        });
    }

    handleTopView() {
        global.app.call(`changeView`, this, 'top');
        this.setState({
            view: 'top'
        });
    }

    // ----------------------------- 网格模式 ------------------------------------------

    handleGridMode() {
        const isGridMode = !this.state.isGridMode;

        if (isGridMode) {
            global.app.editor.scene.overrideMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
        } else {
            global.app.editor.scene.overrideMaterial = null;
        }

        this.setState({
            isGridMode
        });
    }

    // ---------------------------- 截图 ----------------------------------------------
    handleScreenshot() {
        const isGridMode = this.state.isGridMode;
        if (isGridMode) {
            global.app.editor.scene.overrideMaterial = null;
            this.setState({
                isGridMode: false
            });
        }
        const size = global.app.editor.renderer.getSize( new THREE.Vector2() );
        this.setState({
            old_scene_background: global.app.editor.scene.background,
            old_width: size.width,
            old_height: size.height
        });
        const canvas = global.app.editor.renderer.domElement;
        global.app.editor.renderer.setSize(1500, 1500);
        global.app.editor.camera.aspect = canvas.width / canvas.height;
        global.app.editor.camera.updateProjectionMatrix();
        global.app.storage.showViewHelper = false;
        let sceneHelpers = global.app.editor.sceneHelpers;
        for (let i = 0; i < sceneHelpers.children.length; i++) {
            let child = sceneHelpers.children[i];
            if (child.type === 'GridHelper') {
                sceneHelpers.remove(child);
            }
        }
        let scene = global.app.editor.scene;
        // hide AxesHelper
        scene.traverse(function (node) {
            if (node.type === 'AxesHelper') {
                node.visible = false;
            }
        });
        global.app.editor.select(null);
        this.setState({
            is_top: false
        });
        global.app.on(`afterRender.Screenshot`, this.commitScreenshot);
    }

    handleTopViewScreenshot() {
        if (!this.state.is_top) {
            // const model_size = global.app.model_size;
            // global.app.editor.renderer.setSize(model_size.x * 1000, model_size.y * 1000);
            const canvas = global.app.editor.renderer.domElement;
            global.app.editor.renderer.setSize(this.state.old_width, this.state.old_height);
            global.app.editor.camera.aspect = canvas.width / canvas.height;
            global.app.editor.camera.updateProjectionMatrix();
            this.handleTopView()
            global.app.editor.scene.background = null
            // global.app.editor.scene.background = new THREE.Color('rgb(0, 255, 0)');
            // new THREE.Color('rgb(0, 177, 64)')
            // new THREE.Color('rgb(0, 255, 0)');
            // new THREE.Color('rgb(0, 177, 64)');
            global.app.on(`afterRender.Screenshot`, this.commitScreenshot);
        } else {
            this.handlePerspective();
            new GridHelper().start();
            global.app.storage.showViewHelper = true;
            global.app.editor.scene.background = this.state.old_scene_background;
            const canvas = global.app.editor.renderer.domElement;
            global.app.editor.renderer.setSize(this.state.old_width, this.state.old_height);
            global.app.editor.camera.aspect = canvas.width / canvas.height;
            global.app.editor.camera.updateProjectionMatrix();
            let scene = global.app.editor.scene;
            // hide AxesHelper
            scene.traverse(function (node) {
                if (node.type === 'AxesHelper') {
                    node.visible = true;
                }
            });
            // global.app.editor.renderer.render(global.app.editor.scene, global.app.editor.camera);
        }
    }
        
    commitScreenshot() {
        global.app.on(`afterRender.Screenshot`, null);
        let name = 'icon'
        let w = 0
        let h = 0
        if (this.state.is_top) {
            name = 'top_icon'
        }
        const canvas = global.app.editor.renderer.domElement;
        const dataUrl = Converter.canvasToDataURL(canvas, 'image/png', 1, w, h);
        const file = Converter.dataURLtoFile(dataUrl, name);
        const model_size = global.app.model_size;
        let form = new FormData();
        form.append('id', global.app.ModelID);
        form.append('file', file);
        form.append('width', model_size.x);
        form.append('height', model_size.z);

        fetch(`/api/Screenshot/Add`, {
            method: 'POST',
            body: form
        }).then(response => {
            this.handleTopViewScreenshot();
            this.setState({
                is_top: true
            });
            response.json().then(obj => {
                if (obj.Code !== 200) {
                    global.app.toast(_t(obj.Msg), 'warn');
                    return;
                }
                global.app.commitScreenshot = true;
                global.app.toast(_t(obj.Msg), 'success');
            });
        });
    }

    // --------------------------- 第一视角 ------------------------------

    handleFirstPerspective() {
        let controls = global.app.editor.controls;

        controls.on(`change.FirstPerspective`, (enabled, controlName) => {
            if (controlName !== 'FirstPersonControls') {
                return;
            }
            this.setState({
                isFirstPerspective: enabled
            });
        });

        controls.changeMode('FirstPersonControls');
    }

    handleAddAxesHelper() {
        let helper = new THREE.AxesHelper(10);
        helper.name = _t('坐标轴');
        helper.position.x = 0;
        helper.position.y = 0;
        helper.position.z = 0;
        const scene = global.app.editor.scene;
        scene.add(helper);
        global.app.editor.selectByUuid(helper.uuid);
        global.app.call('sceneGraphChanged', this);
    }

    handleChange(value) {
        const export_maps = value;
        console.log(export_maps, value);
        this.setState({
            export_maps: value
        });
        global.app.export_maps = value;
    }

    handleCenterAxesHelper() {
        global.app.editor.addCenterAxesHelper()
    }

    handleExport() {
        if (global.app.set_material === undefined || global.app.set_material === null || !global.app.set_material) {
            global.app.toast('请选择材质通道类型');
            return
        }

        const export_maps = global.app.export_maps || false;

        if (!export_maps) {
            if (!global.app.commitScreenshot || global.app.commitScreenshot == undefined) {
                global.app.toast('请设置icon');
                return
            }
        }
        global.app.require('GLTFExporter').then(() => {
            var exporter = new THREE.GLTFExporter();
            const scene = global.app.editor.scene.clone();
            const positions = [];
            let resultObject = new THREE.Group();
            let materials = [];
            // 原点
            let origin = new THREE.Vector3();
            scene.traverse(function (object) {
                if (object.name === '中心点' && object.type === 'AxesHelper') {
                    origin.copy(object.position);
                }

                if (object.type === 'Group' && object.parent.type === 'Scene') {
                    resultObject.copy(object);
                }
            });
            scene.traverse(function (node) {
                if (node.type === 'Mesh') {
                    materials.push({
                        'name': node.material.name,
                        'custom_type': node.material.custom_type,
                        'custom_material_value': node.material.custom_material_value,
                        'roughness': node.material.roughness || 0,
                        'metalness': node.material.metalness || 0,
                        'light_intensity': node.material.light_intensity || 0,
                        'opacity': node.material.opacity || 0,
                    })
                }
            });
            scene.traverse(function (node) {
                if (node.type === 'AxesHelper' && node.name !== '中心点') {
                    // const local = node.worldToLocal(new THREE.Vector3());
                    positions.push([
                        (node.position.x - origin.x) * 100,
                        (node.position.y - origin.y) * 100,
                        (node.position.z - origin.z) * 100,
                    ]);
                }
            });
            resultObject.traverse(function (node) {
                if (node.type === 'Mesh') {
                    node.geometry.translate(-origin.x, -origin.y, -origin.z);
                    node.updateMatrix();
                    node.updateMatrixWorld(true);
                }
            });
            scene.clear();
            scene.add(resultObject);
            const that = this;
            exporter.parse(scene, function (result) {
                const blob = new Blob([JSON.stringify(result)], { type: 'application/octet-stream' });
                const file = new File([blob], 'model.gltf');
                let form = new FormData();
                form.append('file', file);
                form.append('id', global.app.ModelID);
                form.append('positions', positions);
                form.append('materials', JSON.stringify(materials));
                form.append('export_maps', export_maps);
                fetch(`/api/Mesh/Export`, {
                    method: 'POST',
                    body: form
                }).then(response => {
                    response.json().then(obj => {
                        if (obj.Code !== 200) {
                            global.app.toast(_t(obj.Msg), 'warn');
                            return;
                        }
                        scene.traverse(function (node) {
                            if (node.type === 'Mesh') {
                                node.geometry.translate(origin.x, origin.y, origin.z);
                                // node.scale.set(1, 1, 1);
                                node.updateMatrix();
                            }
                        });
                        var data = obj.Data;
                        var path = data.path;
                        // 下载
                        global.app.toast('保存成功', 'success');
                        // window.open(`${global.app.options.server}${path}`);
                    });
                });
            }, {
                embedImages: true,
            });
        });
    }
}

export default GeneralTools;