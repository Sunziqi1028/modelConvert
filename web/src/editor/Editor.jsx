
import './css/Editor.css';

import {BorderLayout, LoadMask} from '../ui/index';

import EditorMenuBar from './menu/EditorMenuBar.jsx';
import EditorStatusBar from './status/EditorStatusBar.jsx';
import EditorToolbar from './toolbar/EditorToolbar.jsx';
import Viewport from './viewport/Viewport.jsx';
import EditorSideBar from './sidebar/EditorSideBar.jsx';
import AssetsPanel from './assets/AssetsPanel.jsx';

import History from '../command/History';
import Helpers from '../helper/Helpers';

import ControlsManager from '../controls/ControlsManager';
import EmptySceneTemplate from './menu/scene/EmptySceneTemplate';
import global from '../global';

/**
 * 编辑器
 */
class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showMask: false,
            maskText: _t('请等待...'),
            elements: [],
            assetsPanelShow: global.app.storage.assetsPanelShow,
            sidebarShow: global.app.storage.sidebarShow,
            toolbarShow: global.app.storage.toolbarShow,
            statusBarShow: global.app.storage.statusBarShow
        };

        this.type = 'scene'; // 编辑器类型：scene, mesh, texture, material, terrain, ai

        this.onToggle = this.onToggle.bind(this);
    }

    render() {
        const {
            showMask,
            maskText,
            elements,
            assetsPanelShow,
            sidebarShow,
            toolbarShow,
            statusBarShow
        } = this.state;
        const isLogin = !global.app.server.enableAuthority || global.app.server.isLogin;

        return <>
            <BorderLayout className={'Editor'}>
                <EditorMenuBar region={'north'}/>
                {<EditorStatusBar region={'south'}
                                  show={statusBarShow}
                />}
                {<AssetsPanel region={'west'}
                              split
                              show={assetsPanelShow}
                              onToggle={this.onToggle}
                />}
                {isLogin && <EditorSideBar region={'east'}
                                           split
                                           show={sidebarShow}
                                           onToggle={this.onToggle}
                />}
                <BorderLayout region={'center'}>
                    {isLogin && <EditorToolbar region={'north'}
                                               show={toolbarShow}
                    />}
                    <Viewport region={'center'}/>
                </BorderLayout>
            </BorderLayout>
            {elements.map((n, i) => {
                return <div key={i}>{n}</div>;
            })}
            <LoadMask text={maskText}
                      show={showMask}
            />
        </>;
    }

    componentDidMount() {
        global.app.editor = this;

        // 基础
        this.history = new History(this);

        // 场景
        this.scene = new THREE.Scene();
        this.scene.name = _t('Scene');
        this.scene.background = new THREE.Color(0xaaaaaa);

        this.sceneHelpers = new THREE.Scene();

        this.sceneID = null; // 当前场景ID
        this.sceneName = null; // 当前场景名称

        const width = global.app.viewport.clientWidth;
        const height = global.app.viewport.clientHeight;

        // 相机
        this.DEFAULT_CAMERA = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
        this.DEFAULT_CAMERA.name = _t('DefaultCamera');
        this.DEFAULT_CAMERA.userData.isDefault = true;
        this.DEFAULT_CAMERA.userData.control = 'OrbitControls'; // 场景控制类型
        this.DEFAULT_CAMERA.userData.orbitOptions = {
            enableDamping: true,
            dampingFactor: 0.08,
            panSpeed: 1.6
        };
        this.DEFAULT_CAMERA.position.set(20, 10, 20);
        this.DEFAULT_CAMERA.lookAt(new THREE.Vector3());

        // 说明：默认是透视相机，当选择正视图、侧视图、顶视图时，使用正交相机进行渲染、选中。

        // 视图
        this.view = 'perspective'; // perspective, front, side, top

        // 透视相机
        this.camera = this.DEFAULT_CAMERA.clone();

        // 正交相机
        this.orthCamera = new THREE.OrthographicCamera(-width / 4, width / 4, height / 4, -height / 4, 0.1, 10000);

        // 渲染器
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        // this.renderer.gammaInput = false;
        // this.renderer.gammaOutput = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.autoClear = false;
        this.renderer.autoUpdateScene = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);

        global.app.viewport.appendChild(this.renderer.domElement);
        this.renderer.setSize(width, height);

        // 物体
        this.objects = [];

        this.scripts = [];

        this.animations = [];

        // 当前选中物体
        this.selected = null;

        // 平移旋转缩放控件
        this.transformControls = new THREE.TransformControls(this.camera, global.app.viewport);
        this.sceneHelpers.add(this.transformControls);

        // 编辑器控件
        this.controls = new ControlsManager(this.camera, global.app.viewport);

        // 帮助器场景灯光
        let light = new THREE.DirectionalLight(0xffffff, 1.0);
        light.position.z = 10;
        this.sceneHelpers.add(light);

        this.showViewHelper = true;

        // GPUPick使用数量。为0时，为了提升性能，不启用GPUPick。
        this.gpuPickNum = global.app.storage.hoverEnabled ? 1 : 0;

        // 事件
        global.app.on(`appStarted.Editor`, this.onAppStarted.bind(this));
        global.app.on(`showMask.Editor`, this.onShowMask.bind(this));
        global.app.on(`storageChanged.Editor`, this.onStorageChanged.bind(this));

        // 帮助器
        this.helpers = new Helpers(global.app);

        global.app.call('appStart', this);
        global.app.call('appStarted', this);

        global.app.call('resize', this);

        global.app.log(_t('Program started.'));
    }

    componentWillUnmount() {
        global.app.call('appStop', this);
        global.app.call('appStoped', this);

        global.app.log(_t('Program stoped.'));

        global.app.event.stop();
    }

    onAppStarted() {
        this.helpers.start();
        this.clear();

        this._addAudioListener = this._addAudioListener.bind(this);
        document.addEventListener('click', this._addAudioListener);

        // 如果检测到有自动保存的场景，提示是否载入
        global.app.call(`queryLoadAutoSceneScene`, this);
    }

    onToggle() {
        global.app.call('resize', this);
    }

    onStorageChanged(key, value) {
        const keys = ['assetsPanelShow', 'sidebarShow', 'toolbarShow', 'statusBarShow'];
        if (keys.indexOf(key) === -1) {
            return;
        }
        this.setState({
            [key]: value
        }, () => {
            global.app.call(`resize`, this);
        });
    }

    // -------------------- 场景 --------------------------

    setScene(scene) { // 设置场景
        // 移除原有物体
        let objects = this.scene.children;
        while (objects.length > 0) {
            this.removeObject(objects[0]);
        }

        // 添加新物体
        let children = scene.children.slice();
        scene.children.length = 0;
        this.scene = scene;

        children.forEach(n => {
            this.addObject(n);
        });

        global.app.call('sceneGraphChanged', this);
    }

    clear(addObject = true) { // 清空场景
        const template = new EmptySceneTemplate();
        template.clear();

        // 添加默认元素
        if (addObject) {
            template.create();
        }

        global.app.call('editorCleared', this);
        global.app.call('scriptChanged', this);
        global.app.call('animationChanged', this);
    }

    // 点击编辑器时才添加AudioListener，避免警告信息
    _addAudioListener() {
        document.removeEventListener('click', this._addAudioListener);

        this.audioListener = new THREE.AudioListener();
        this.audioListener.name = _t('AudioListener');

        if (this.camera.children.findIndex(o => o instanceof THREE.AudioListener) === -1) {
            this.camera.add(this.audioListener);
        }
    }

    // ---------------------- 物体 ---------------------------

    objectByUuid(uuid) { // 根据uuid获取物体
        return this.scene.getObjectByProperty('uuid', uuid, true);
    }

    addObject(object) { // 添加物体
        this.scene.add(object);
        global.app.call('objectAdded', this, object);
        global.app.call('sceneGraphChanged', this);
    }

    addCenterAxesHelper() { // 添加中心轴
        const scene = this.scene.clone();
        let hasCenterAxesHelper = false
        scene.traverse(function (object) {
            if (object.name === '中心点' && object.type === 'AxesHelper') {
                hasCenterAxesHelper = true;
            }
        });
        if (hasCenterAxesHelper) {
            return;
        } else {
            let helper = new THREE.AxesHelper(10);
            helper.name = '中心点'
            helper.position.x = 0;
            helper.position.y = 0;
            helper.position.z = 0;
            this.scene.add(helper);
            this.selectByUuid(helper.uuid);
            global.app.call('sceneGraphChanged', this);
        }
    }

    moveObject(object, parent, before) { // 移动物体
        if (parent === undefined) {
            parent = this.scene;
        }

        parent.add(object);

        // sort children array
        if (before !== undefined) {
            let index = parent.children.indexOf(before);
            parent.children.splice(index, 0, object);
            parent.children.pop();
        }

        global.app.call('sceneGraphChanged', this);
    }

    removeObject(object) { // 移除物体
        if (object.parent === null) { // 避免删除相机或场景
            return;
        }

        object.parent.remove(object);

        global.app.call('objectRemoved', this, object);
        global.app.call('sceneGraphChanged', this);
    }

    // ------------------------- 帮助 ------------------------------

    addPhysicsHelper(helper) {
        let geometry = new THREE.SphereBufferGeometry(2, 4, 2);
        let material = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            visible: false
        });

        let picker = new THREE.Mesh(geometry, material);
        picker.name = 'picker';
        picker.userData.object = helper.object;
        helper.add(picker);

        this.sceneHelpers.add(helper);
        this.helpers[helper.object.id] = helper;
        this.objects.push(picker);
    }

    removePhysicsHelper(helper) {
        if (this.helpers[helper.object.id] !== undefined) {
            helper.parent.remove(helper);
            delete this.helpers[helper.object.id];

            let objects = this.objects;
            objects.splice(objects.indexOf(helper.getObjectByName('picker')), 1);
        }
    }

    // ------------------------ 选中事件 --------------------------------

    select(object) { // 选中物体
        if (this.selected === object) {
            return;
        }

        this.selected = object;

        if (!object) {
            this.transformControls.detach();
        }

        global.app.call('objectSelected', this, object);
    }

    selectById(id) { // 根据id选中物体
        if (id === this.camera.id) {
            this.select(this.camera);
            return;
        }

        this.select(this.scene.getObjectById(id, true));
    }

    selectByUuid(uuid) { // 根据uuid选中物体
        if (uuid === this.camera.uuid) {
            this.select(this.camera);
            return;
        }

        this.scene.traverse(child => {
            if (child.uuid === uuid) {
                this.select(child);
            }
        });
    }

    deselect() { // 取消选中物体
        this.select(null);
    }

    // ---------------------- 焦点事件 --------------------------

    focus(object) { // 设置焦点
        global.app.call('objectFocused', this, object);
    }

    focusById(id) { // 根据id设置交点
        let obj = this.scene.getObjectById(id, true);
        if (obj) {
            this.focus(obj);
        }
    }

    focusByUUID(uuid) { // 根据uuid设置焦点
        if (uuid === this.camera.uuid) {
            this.focus(this.camera);
            return;
        }

        this.scene.traverse(child => {
            if (child.uuid === uuid) {
                this.focus(child);
            }
        });
    }

    // ----------------------- 命令事件 --------------------------

    execute(cmd, optionalName) { // 执行事件
        this.history.execute(cmd, optionalName);
    }

    undo() { // 撤销事件
        this.history.undo();
    }

    redo() { // 重做事件
        this.history.redo();
    }

    // ---------------------- 用户界面 --------------------------------

    createElement(type, props = {}, children = undefined) {
        let ref = React.createRef();
        props.ref = ref;
        return React.createElement(type, props, children);
    }

    addElement(element, callback) {
        let elements = this.state.elements;

        elements.push(element);

        this.setState({elements}, callback);
    }

    removeElement(element, callback) {
        let elements = this.state.elements;

        let index = elements.findIndex(n => n === element || n.ref && n.ref.current === element);

        if (index > -1) {
            elements.splice(index, 1);
        }

        this.setState({elements}, callback);
    }

    onShowMask(enabled, text) {
        this.setState({
            showMask: enabled,
            maskText: text || _t('Waiting...')
        });
    }
}

export default Editor;