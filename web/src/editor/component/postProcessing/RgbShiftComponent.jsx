
import { PropertyGroup, CheckBoxProperty, NumberProperty } from '../../../ui/index';
import global from '../../../global';

/**
 * 颜色偏移组件
 
 */
class RgbShiftComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: false,
            enabled: false,
            amount: 0.1
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, enabled, amount } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('RGB Shift Effect')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               >
            <CheckBoxProperty label={_t('EnableState')}
                name={'enabled'}
                value={enabled}
                onChange={this.handleChange}
            />
            <NumberProperty label={_t('Amount')}
                name={'amount'}
                value={amount}
                onChange={this.handleChange}
            />
        </PropertyGroup>;
    }

    componentDidMount() {
        global.app.on(`objectSelected.RgbShiftComponent`, this.handleUpdate);
        global.app.on(`objectChanged.RgbShiftComponent`, this.handleUpdate);
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
            enabled: postProcessing.rgbShift ? postProcessing.rgbShift.enabled : false,
            amount: postProcessing.rgbShift ? postProcessing.rgbShift.amount : this.state.amount
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

        const { enabled, amount } = Object.assign({}, this.state, {
            [name]: value
        });

        let scene = this.selected;

        scene.userData.postProcessing = scene.userData.postProcessing || {};

        Object.assign(scene.userData.postProcessing, {
            rgbShift: {
                enabled,
                amount
            }
        });

        global.app.call(`objectChanged`, this, this.selected);
        global.app.call(`postProcessingChanged`, this);
    }
}

export default RgbShiftComponent;