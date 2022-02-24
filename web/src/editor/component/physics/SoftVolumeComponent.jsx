
import { PropertyGroup, NumberProperty } from '../../../ui/index';
import global from '../../../global';

/**
 * 柔软体组件
 
 */
class SoftVolumeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: true,
            mass: 1,
            pressure: 1
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, mass, pressure } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('SoftVolume')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               >
            <NumberProperty label={'Mass'}
                name={'mass'}
                value={mass}
                onChange={this.handleChange}
            />
            <NumberProperty label={_t('Pressure')}
                name={'pressure'}
                value={pressure}
                onChange={this.handleChange}
            />
        </PropertyGroup>;
    }

    componentDidMount() {
        global.app.on(`objectSelected.SoftVolumeComponent`, this.handleUpdate);
        global.app.on(`objectChanged.SoftVolumeComponent`, this.handleUpdate);
    }

    handleExpand(expanded) {
        this.setState({
            expanded
        });
    }

    handleUpdate() {
        const editor = global.app.editor;

        if (!editor.selected ||
            !editor.selected.userData.physics ||
            !editor.selected.userData.physics.enabled ||
            editor.selected.userData.physics.type !== 'softVolume') {
            this.setState({
                show: false
            });
            return;
        }

        this.selected = editor.selected;

        let { mass, pressure } = this.selected.userData.physics || {};

        this.setState({
            show: true,
            mass: mass || 0,
            pressure: pressure || 0
        });
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value
            });
            return;
        }

        const { mass, pressure } = Object.assign({}, this.state, {
            [name]: value
        });

        let physics = this.selected.userData.physics;

        physics.mass = mass;
        physics.pressure = pressure;

        global.app.call('objectChanged', this, this.selected);
    }
}

export default SoftVolumeComponent;