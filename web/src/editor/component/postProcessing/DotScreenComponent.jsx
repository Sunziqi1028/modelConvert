
import { PropertyGroup, CheckBoxProperty, NumberProperty } from '../../../ui/index';
import global from '../../../global';

/**
 * 点阵化组件
 
 */
class DotScreenComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: false,
            enabled: false,
            scale: 4.0
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, enabled, scale } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('DotScreenEffect')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               >
            <CheckBoxProperty label={_t('EnableState')}
                name={'enabled'}
                value={enabled}
                onChange={this.handleChange}
            />
            <NumberProperty label={_t('Scale')}
                name={'scale'}
                value={scale}
                onChange={this.handleChange}
            />
        </PropertyGroup>;
    }

    componentDidMount() {
        global.app.on(`objectSelected.DotScreenComponent`, this.handleUpdate);
        global.app.on(`objectChanged.DotScreenComponent`, this.handleUpdate);
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
            enabled: postProcessing.dotScreen ? postProcessing.dotScreen.enabled : false,
            scale: postProcessing.dotScreen ? postProcessing.dotScreen.scale : this.state.scale
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

        const { enabled, scale } = Object.assign({}, this.state, {
            [name]: value
        });

        let scene = this.selected;

        scene.userData.postProcessing = scene.userData.postProcessing || {};

        Object.assign(scene.userData.postProcessing, {
            dotScreen: {
                enabled,
                scale
            }
        });

        global.app.call(`objectChanged`, this, this.selected);
        global.app.call(`postProcessingChanged`, this);
    }
}

export default DotScreenComponent;