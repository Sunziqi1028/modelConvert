
import {classNames} from '../../third_party';
import {MenuBar, MenuBarFiller} from '../../ui/index';
import EditMenu from './EditMenu.jsx';
import ViewMenu from './ViewMenu.jsx';
import SystemMenu from './SystemMenu.jsx';
import LoginMenu from './LoginMenu.jsx';
import global from '../../global';

/**
 * 编辑器菜单栏
 */
class EditorMenuBar extends React.Component {
    render() {
        const {className} = this.props;
        const {enableAuthority, isLogin, isAdmin} = global.app.server;

        return <MenuBar className={classNames('EditorMenuBar', className)}>
            {!enableAuthority || isLogin ? <EditMenu/> : null}
            {enableAuthority && isAdmin ? <SystemMenu/> : null}
            <ViewMenu/>
            <MenuBarFiller/>
            {enableAuthority && <LoginMenu/>}
        </MenuBar>;
    }
}

export default EditorMenuBar;