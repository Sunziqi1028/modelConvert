
import './css/WeatherPanel.css';
import { Form, FormControl, Label, Select } from '../../../../ui/index';
import global from '../../../../global';

/**
 * 天气选项窗口
 
 */
class WeatherPanel extends React.Component {
    constructor(props) {
        super(props);

        this.weathers = {
            '': _t('None'),
            rain: _t('Rain'),
            snow: _t('Snow')
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const weather = global.app.options.weather;

        return <Form className={'WeatherPanel'}>
            <FormControl>
                <Label>{_t('Weather')}</Label>
                <Select className={'weather'}
                    name={'weather'}
                    value={weather}
                    options={this.weathers}
                    onChange={this.handleChange}
                />
            </FormControl>
        </Form>;
    }

    handleUpdate() {
        this.forceUpdate();
    }

    handleChange(value, name) {
        global.app.options.weather = value;

        global.app.call(`optionChange`, this, name, value);

        this.handleUpdate();
    }
}

export default WeatherPanel;