
import './css/ScriptEditorPanel.css';
import { classNames } from '../../third_party';
import { Icon } from '../../ui/index';
import ScriptEditor from '../script/ScriptEditor';
import global from '../../global';

/**
 * 脚本面板
 
 */
class ScriptEditorPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            uuid: null,
            name: '',
            type: 'javascript',
            source: ''
        };

        this.callback = null;

        this.ref = React.createRef();

        this.handleEditScript = this.handleEditScript.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    render() {
        const { show, name, type } = this.state;

        let title = name;

        switch (type) {
            case 'javascript':
                title = name + '.js';
                break;
            case 'vertexShader':
            case 'fragmentShader':
                title = name + '.glsl';
                break;
            case 'json':
                title = name + '.json';
                break;
        }

        return <div className={classNames('ScriptEditorPanel', !show && 'hidden')}>
            <div className={'header'}>
                <div className={'title'}>{title}</div>
                <Icon icon={'close'}
                    onClick={this.handleSave}
                />
            </div>
            <div className={'content'}
                ref={this.ref}
            />
        </div>;
    }

    componentDidMount() {
        global.app.require(['codemirror', 'codemirror-addon', 'esprima', 'jsonlint', 'glslprep', 'acorn', 'ternjs']).then(() => {
            global.app.scriptEditor = new ScriptEditor(this.ref.current);
        });
        global.app.on(`editScript.ScriptPanel`, this.handleEditScript);
    }

    handleEditScript(uuid, name, type, source, callback) {
        this.callback = callback;

        this.setState({
            show: true,
            uuid,
            name,
            type,
            source
        }, () => {
            global.app.scriptEditor.setValue(source, type);
        });
    }

    handleSave() {
        const { uuid, name, type } = this.state;

        const source = global.app.scriptEditor.getValue();

        this.callback && this.callback(uuid, name, type, source);

        this.callback = null;

        this.setState({
            show: false,
            uuid: null,
            name: '',
            type: 'javascript',
            source: ''
        });
    }
}

export default ScriptEditorPanel;