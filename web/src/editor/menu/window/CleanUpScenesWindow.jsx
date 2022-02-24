
import './css/CleanUpScenesWindow.css';
import { Window, Content, Buttons, Button } from '../../../ui/index';
import global from '../../../global';

/**
 * 清理场景窗口
 
 */
class CleanUpScenesWindow extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        return <Window
            className={'CleanUpScenesWindow'}
            title={_t('Clean Up Scenes')}
            style={{ width: '400px', height: '320px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content />
            <Buttons>
                <Button onClick={this.handleClose}>{_t('Close')}</Button>
            </Buttons>
        </Window>;
    }

    handleClose() {
        global.app.removeElement(this);
    }
}

export default CleanUpScenesWindow;