
import { PropertyGroup, CheckBoxProperty } from '../../../ui/index';
import global from '../../../global';

/**
 * 指针锁定控制器组件
 
 */
class PointerLockControlComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: false,
            isLocked: true
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, isLocked } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('Pointer Lock Controls')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               >
            <CheckBoxProperty label={_t('IsLocked')}
                name={'isLocked'}
                value={isLocked}
                onChange={this.handleChange}
            />
        </PropertyGroup>;
    }

    componentDidMount() {
        global.app.on(`objectSelected.PointerLockControlComponent`, this.handleUpdate.bind(this));
        global.app.on(`objectChanged.PointerLockControlComponent`, this.handleUpdate.bind(this));
    }

    handleExpand(expanded) {
        this.setState({
            expanded
        });
    }

    handleUpdate() {
        const editor = global.app.editor;

        if (!editor.selected || editor.selected !== editor.camera || editor.selected.userData.control !== 'PointerLockControls') {
            this.setState({
                show: false
            });
            return;
        }

        this.selected = editor.selected;

        if (this.selected.userData.pointerLockOptions === undefined) {
            this.selected.userData.pointerLockOptions = {
                isLocked: true
            };
        }

        this.setState({
            show: true,
            ...this.selected.userData.pointerLockOptions
        });
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value
            });
            return;
        }

        const { isLocked } = Object.assign({}, this.state, {
            [name]: value
        });

        Object.assign(this.selected.userData.pointerLockOptions, {
            isLocked
        });

        global.app.call('objectChanged', this, this.selected);
    }
}

export default PointerLockControlComponent;