
import { MenuItem, MenuItemSeparator } from '../../ui/index';
import global from '../../global';

/**
 * 视图菜单
 
 */
class ViewMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            assetsPanelShow: global.app.storage.assetsPanelShow,
            sidebarShow: global.app.storage.sidebarShow,
            toolbarShow: global.app.storage.toolbarShow,
            statusBarShow: global.app.storage.statusBarShow,

            showStats: global.app.storage.showStats,
            showGrid: global.app.storage.showGrid,
            showViewHelper: global.app.storage.showViewHelper,
            enablePhysics: global.app.options.enablePhysics,
            isThrowBall: false
        };

        this.handleShowAssetsPanel = this.handleShowAssetsPanel.bind(this);
        this.handleShowSidebar = this.handleShowSidebar.bind(this);
        this.handleShowToolbar = this.handleShowToolbar.bind(this);
        this.handleShowStatusBar = this.handleShowStatusBar.bind(this);

        this.handleShowStats = this.handleShowStats.bind(this);
        this.handleShowGrid = this.handleShowGrid.bind(this);
        this.handleShowViewHelper = this.handleShowViewHelper.bind(this);

        this.handleEnablePhysics = this.handleEnablePhysics.bind(this);
        this.handleEnableThrowBall = this.handleEnableThrowBall.bind(this);
    }

    render() {
        const { assetsPanelShow, sidebarShow, toolbarShow, statusBarShow, showStats, showGrid, showViewHelper, enablePhysics, isThrowBall } = this.state;

        return <MenuItem title={_t('View')}>
           {/* <MenuItem title={_t('Assets Panel')} */}
                {/* checked={assetsPanelShow} */}
                {/* onClick={this.handleShowAssetsPanel} */}
            {/* /> */}
            <MenuItem title={_t('Sidebar')}
                checked={sidebarShow}
                onClick={this.handleShowSidebar}
            />
            <MenuItem title={_t('Toolbar')}
                checked={toolbarShow}
                onClick={this.handleShowToolbar}
            />
            <MenuItem title={_t('Status Bar')}
                checked={statusBarShow}
                onClick={this.handleShowStatusBar}
            />
            <MenuItemSeparator />
            <MenuItem title={_t('Stats')}
                checked={showStats}
                onClick={this.handleShowStats}
            />
            <MenuItem title={_t('Grid')}
                checked={showGrid}
                onClick={this.handleShowGrid}
            />
            <MenuItem title={_t('View Helper')}
                checked={showViewHelper}
                onClick={this.handleShowViewHelper}
            />
            <MenuItemSeparator />
        </MenuItem>;
    }

    handleShowAssetsPanel() {
        const assetsPanelShow = !global.app.storage.assetsPanelShow;
        global.app.storage.assetsPanelShow = assetsPanelShow;

        this.setState({
            assetsPanelShow
        });
    }

    handleShowSidebar() {
        const sidebarShow = !global.app.storage.sidebarShow;
        global.app.storage.sidebarShow = sidebarShow;

        this.setState({
            sidebarShow
        });
    }

    handleShowToolbar() {
        const toolbarShow = !global.app.storage.toolbarShow;
        global.app.storage.toolbarShow = toolbarShow;

        this.setState({
            toolbarShow
        });
    }

    handleShowStatusBar() {
        const statusBarShow = !global.app.storage.statusBarShow;
        global.app.storage.statusBarShow = statusBarShow;

        this.setState({
            statusBarShow
        });
    }

    handleShowStats() {
        const showStats = !global.app.storage.showStats;
        global.app.storage.showStats = showStats;

        Object.assign(global.app.stats.dom.style, {
            display: showStats ? 'block' : 'none'
        });

        this.setState({
            showStats
        });
    }

    handleShowGrid() {
        const showGrid = !global.app.storage.showGrid;
        global.app.storage.showGrid = showGrid;

        this.setState({
            showGrid
        });
    }

    handleShowViewHelper() {
        const showViewHelper = !global.app.storage.showViewHelper;
        global.app.storage.showViewHelper = showViewHelper;

        this.setState({
            showViewHelper
        });
    }

    handleEnablePhysics() {
        const enablePhysics = !global.app.options.enablePhysics;
        global.app.options.enablePhysics = enablePhysics;
        global.app.call('optionChange', this, 'enablePhysics', enablePhysics);
        this.setState({
            enablePhysics
        });
    }

    handleEnableThrowBall() {
        const isThrowBall = !this.state.isThrowBall;
        global.app.call('enableThrowBall', this, isThrowBall);
        this.setState({
            isThrowBall
        });
    }
}

export default ViewMenu;
