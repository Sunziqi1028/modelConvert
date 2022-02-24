
import './css/DisplayPanel.css';
import { Form, FormControl, Label, Input, CheckBox } from '../../../../ui/index';
import global from '../../../../global';

/**
 * 显示选项窗口
 
 */
class DisplayPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const selectedColor = global.app.storage.selectedColor;
        const selectedThickness = global.app.storage.selectedThickness;
        const hoverEnabled = global.app.storage.hoverEnabled;
        const hoveredColor = global.app.storage.hoveredColor;

        return <Form className={'DisplayPanel'}>
            <FormControl>
                <Label>{_t('Selected Color')}</Label>
                <Input className={'selected-color'}
                    name={'selectedColor'}
                    type={'color'}
                    value={selectedColor}
                    onChange={this.handleChange}
                />
            </FormControl>
            <FormControl>
                <Label>{_t('Border Thickness')}</Label>
                <Input className={'selected-thickness'}
                    name={'selectedThickness'}
                    type={'number'}
                    min={1}
                    max={100}
                    precision={1}
                    value={selectedThickness}
                    onChange={this.handleChange}
                />
            </FormControl>
            <FormControl>
                <Label>{_t('Enable Hover')}</Label>
                <CheckBox name={'hoverEnabled'}
                    checked={hoverEnabled}
                    onChange={this.handleChange}
                />
            </FormControl>
            <FormControl>
                <Label>{_t('Hover Color')}</Label>
                <Input className={'hovered-color'}
                    name={'hoveredColor'}
                    type={'color'}
                    value={hoveredColor}
                    onChange={this.handleChange}
                />
            </FormControl>
        </Form>;
    }

    handleUpdate() {
        this.forceUpdate();
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value
            });
            return;
        }

        if (name === 'hoverEnabled') {
            if (value) {
                global.app.editor.gpuPickNum++;
            } else {
                global.app.editor.gpuPickNum--;
            }
        }

        global.app.storage[name] = value;

        this.handleUpdate();
    }
}

export default DisplayPanel;