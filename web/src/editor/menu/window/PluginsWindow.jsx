
import './css/PluginsWindow.css';
import { Window, Content, Buttons, Form, FormControl, Label, Input, Button } from '../../../ui/index';
import global from '../../../global';

/**
 * 插件窗口
 
 */
class PluginsWindow extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const attributes = global.app.editor.renderer.getContextAttributes();

        return <Window
            className={'PluginsWindow'}
            title={_t('Plugins')}
            style={{ width: '400px', height: '320px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content>
                <Form>
                    {Object.keys(attributes).map(key => {
                        const value = attributes[key];
                        return <FormControl key={key}>
                            <Label>{_t(key)}</Label>
                            <Input name={key}
                                value={value.toString()}
                                disabled
                            />
                        </FormControl>;
                    })}
                </Form>
            </Content>
            <Buttons>
                <Button onClick={this.handleClose}>{_t('Close')}</Button>
            </Buttons>
        </Window>;
    }

    handleClose() {
        global.app.removeElement(this);
    }
}

export default PluginsWindow;