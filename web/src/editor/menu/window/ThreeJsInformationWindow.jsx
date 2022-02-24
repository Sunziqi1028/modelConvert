
import { Window, Content, Buttons, Form, FormControl, Label, Input, Button } from '../../../ui/index';
import global from '../../../global';

/**
 * Three.js信息窗口
 
 */
class ThreeJsInformationWindow extends React.Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        return <Window
            className={'ThreeJsInformationWindow'}
            title={_t('Three.js Information')}
            style={{ width: '320px', height: '160px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content>
                <Form>
                    <FormControl>
                        <Label>{_t('Version')}</Label>
                        <Input value={THREE.REVISION}
                            disabled
                        />
                    </FormControl>
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

export default ThreeJsInformationWindow;