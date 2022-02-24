
import { PropertyGroup } from '../../ui/index';
import global from '../../global';

/**
 * 脚本组件
 
 */
class ScriptComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: true
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    render() {
        const { show, expanded } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('ScriptComponent')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               />;
    }

    componentDidMount() {
        global.app.on(`objectSelected.ScriptComponent`, this.handleUpdate);
        global.app.on(`objectChanged.ScriptComponent`, this.handleUpdate);
    }

    handleExpand(expanded) {
        this.setState({
            expanded
        });
    }

    handleUpdate() {
        const editor = global.app.editor;

        if (!editor.selected || !editor.selected.userData) {
            this.setState({
                show: false
            });
            return;
        }

        this.selected = editor.selected;

        let state = {
            show: true
        };

        this.setState(state);
    }
}

export default ScriptComponent;