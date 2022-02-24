
import { PropertyGroup, CheckBoxProperty, SelectProperty } from '../../../ui/index';
import global from '../../../global';

/**
 * 物理类型组件
 
 */
class PhysicsTypeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.type = {
            rigidBody: _t('RigidBody'),
            softVolume: _t('SoftVolume')
        };

        this.state = {
            show: false,
            expanded: false,
            physicsEnabled: false,
            type: 'rigidBody'
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, physicsEnabled, type } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('PhysicsType')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               >
            <CheckBoxProperty label={_t('Enabled')}
                name={'physicsEnabled'}
                value={physicsEnabled}
                onChange={this.handleChange}
            />
            <SelectProperty label={_t('Type')}
                options={this.type}
                name={'type'}
                value={type}
                onChange={this.handleChange}
            />
        </PropertyGroup>;
    }

    componentDidMount() {
        global.app.on(`objectSelected.PhysicsTypeComponent`, this.handleUpdate.bind(this));
        global.app.on(`objectChanged.PhysicsTypeComponent`, this.handleUpdate.bind(this));
    }

    handleExpand(expanded) {
        this.setState({
            expanded
        });
    }

    handleUpdate() {
        const editor = global.app.editor;

        if (!editor.selected || !editor.selected.userData.physics || editor.selected === editor.scene) {
            this.setState({
                show: false
            });
            return;
        }

        this.selected = editor.selected;

        let physics = this.selected.userData.physics || {};

        this.setState({
            show: true,
            physicsEnabled: physics.enabled || false,
            type: physics.type || 'rigidBody'
        });
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value
            });
            return;
        }

        const { physicsEnabled, type } = Object.assign({}, this.state, {
            [name]: value
        });

        if (!this.selected.userData.physics) {
            this.selected.userData.physics = {};
        }

        let physics = this.selected.userData.physics;

        physics.enabled = physicsEnabled;
        physics.type = type;

        global.app.call('objectChanged', this, this.selected);
    }
}

export default PhysicsTypeComponent;