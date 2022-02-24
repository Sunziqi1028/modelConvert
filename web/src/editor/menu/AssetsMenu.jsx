
import { MenuItem, MenuItemSeparator } from '../../ui/index';
import StringUtils from '../../utils/StringUtils';
import Ajax from '../../utils/Ajax';
import global from '../../global';

/**
 * 资源菜单
 
 */
class AssetsMenu extends React.Component {
    constructor(props) {
        super(props);

        this.handleExportGeometry = this.handleExportGeometry.bind(this);
        this.handleExportObject = this.handleExportObject.bind(this);

        this.handleExportGLTF = this.handleExportGLTF.bind(this);
        this.handleExportOBJ = this.handleExportOBJ.bind(this);
    }

    render() {
        return <MenuItem title={'导出'}>
            <MenuItem title={_t('Export Geometry JSON File')}
                onClick={this.handleExportGeometry}
            />
            <MenuItem title={_t('Export Object JSON File')}
                onClick={this.handleExportObject}
            />
            <MenuItemSeparator />
            <MenuItem title={_t('Export GLTF')}
                onClick={this.handleExportGLTF}
            />
            <MenuItem title={_t('Export OBJ')}
                onClick={this.handleExportOBJ}
            />
        </MenuItem>;
    }

    // ------------------------------- 导出几何体 ----------------------------------------

    handleExportGeometry() {
        var editor = global.app.editor;

        var object = editor.selected;

        if (object === null) {
            global.app.toast(_t('Please select object!'), 'warn');
            return;
        }

        var geometry = object.geometry;

        if (geometry === undefined) {
            global.app.toast(_t('The object you selected is not geometry.'), 'warn');
            return;
        }

        var output = geometry.toJSON();

        try {
            output = JSON.stringify(output, StringUtils.parseNumber, '\t');
            // eslint-disable-next-line
            output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
        } catch (e) {
            output = JSON.stringify(output);
        }

        StringUtils.saveString(output, 'geometry.json');
    }

    // ------------------------------- 导出物体 ------------------------------------------

    handleExportObject() {
        var editor = global.app.editor;

        var object = editor.selected;

        if (object === null) {
            global.app.toast(_t('Please select object!'), 'warn');
            return;
        }

        var output = object.toJSON();

        try {
            output = JSON.stringify(output, StringUtils.parseNumber, '\t');
            // eslint-disable-next-line
            output = output.replace(/[\n\t]+([\d\.e\-\[\]]+)/g, '$1');
        } catch (e) {
            output = JSON.stringify(output);
        }

        StringUtils.saveString(output, 'model.json');
    }

    // ------------------------------ 导出gltf文件 ----------------------------------------

    handleExportGLTF() {
        global.app.require('GLTFExporter').then(() => {
            var exporter = new THREE.GLTFExporter();
            const scene = global.app.editor.scene;
            console.log('scene:', scene);
            console.log('scene:', global.app.ModelID);
            const positions = [];
            scene.traverse(function (node) {
                if (node.type === "AxesHelper") {
                    // const world = node.getWorldPosition(new THREE.Vector3());
                    const local = node.worldToLocal(new THREE.Vector3());
                    positions.push([
                        local.x,
                        local.y,
                        local.z
                    ]);
                }
            });
            Ajax.get(`${global.app.options.server}/api/Mesh/Export?id=${global.app.ModelID}&positions=${positions}`, result => {
                var r = JSON.parse(result);
                if (r.Code === 200) {
                    var data = r.Data;
                    var path = data.path;
                    window.open(`${global.app.options.server}${path}`);
                }
            });
        });
    }

    // ------------------------------ 导出obj文件 -----------------------------------------

    handleExportOBJ() {
        var editor = global.app.editor;

        var object = editor.selected;

        if (object === null) {
            global.app.toast(_t('Please select object!'), 'warn');
            return;
        }

        global.app.require('OBJExporter').then(() => {
            var exporter = new THREE.OBJExporter();
            StringUtils.saveString(exporter.parse(object), 'model.obj');
        });
    }

}

export default AssetsMenu;