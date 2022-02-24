
import { PropertyGroup, CheckBoxProperty } from '../../../ui/index';
import global from '../../../global';

/**
 * 多重采样抗锯齿(SMAA)组件
 
 */
class SmaaComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: false,
            enabled: false
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, enabled } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('SMAA')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               >
            <CheckBoxProperty label={_t('EnableState')}
                name={'enabled'}
                value={enabled}
                onChange={this.handleChange}
            />
        </PropertyGroup>;
    }

    componentDidMount() {
        global.app.on(`objectSelected.SmaaComponent`, this.handleUpdate);
        global.app.on(`objectChanged.SmaaComponent`, this.handleUpdate);
    }

    handleExpand(expanded) {
        this.setState({
            expanded
        });
    }

    handleUpdate() {
        const editor = global.app.editor;

        if (!editor.selected || editor.selected !== editor.scene) {
            this.setState({
                show: false
            });
            return;
        }

        this.selected = editor.selected;

        let scene = this.selected;
        let postProcessing = scene.userData.postProcessing || {};

        let state = {
            show: true,
            enabled: postProcessing.smaa ? postProcessing.smaa.enabled : false
        };

        this.setState(state);
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value
            });
            return;
        }

        const { enabled } = Object.assign({}, this.state, {
            [name]: value
        });

        let scene = this.selected;

        scene.userData.postProcessing = scene.userData.postProcessing || {};

        Object.assign(scene.userData.postProcessing, {
            smaa: {
                enabled
            }
        });

        global.app.call(`objectChanged`, this, this.selected);
        global.app.call(`postProcessingChanged`, this);
    }
}

export default SmaaComponent;