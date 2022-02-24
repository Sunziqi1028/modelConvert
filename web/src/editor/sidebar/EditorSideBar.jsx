
import './css/EditorSideBar.css';
import { TabLayout, VBoxLayout } from '../../ui/index';

import HierarchyPanel from './HierarchyPanel.jsx';
import PropertyPanel from './PropertyPanel.jsx';
import global from '../../global';

/**
 * 侧边栏
 */
class EditorSideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            topIndex: 0,
            bottomIndex: 0
        };

        this.handleTopTabChange = this.handleTopTabChange.bind(this);
        this.handleBottomTabChange = this.handleBottomTabChange.bind(this);
    }

    render() {
        const { topIndex, bottomIndex } = this.state;

        return <VBoxLayout className={'EditorSideBar'}>
            <TabLayout className={'top'}
                activeTabIndex={topIndex}
                onActiveTabChange={this.handleTopTabChange}
            >
                <HierarchyPanel title={_t('Hierachy')} />
            </TabLayout>
            <TabLayout className={'bottom'}
                activeTabIndex={bottomIndex}
                onActiveTabChange={this.handleBottomTabChange}
            >
                <PropertyPanel title={_t('Property')} />
            </TabLayout>
        </VBoxLayout>;
    }

    componentDidMount() {
    }

    handleTopTabChange(index) {
        this.setState({
            topIndex: index
        });
    }

    handleBottomTabChange(index) {
        this.setState({
            bottomIndex: index
        });
    }
}

export default EditorSideBar;