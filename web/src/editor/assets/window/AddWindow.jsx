
import './css/EditWindow.css';
import { PropTypes } from '../../../third_party';
import { Window, Content, Buttons, Form, FormControl, Label, Input, Select, ImageUploader, Button, CheckBox } from '../../../ui/index';
import Ajax from '../../../utils/Ajax';
import global from '../../../global';

/**
 * 编辑窗口
 
 */
class AddWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '' || props.data.Name,
            _type: '' || props.data.Type,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);

        this.handleSave = this.handleSave.bind(this, props.callback);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const { type, typeName } = this.props;
        const { name, _type } = this.state;

        return <Window
            className={'EditWindow'}
            title={`${_t('Add')} ${typeName}`}
            style={{ width: '320px', height: '300px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content>
                <Form>
                    <FormControl>
                        <Label>{'类别编号'}</Label>
                        <Input name={'_type'}
                            value={_type}
                            onChange={this.handleTypeChange}
                        />
                        <Label>{'类别名称'}</Label>
                        <Input name={'name'}
                            value={name}
                            onChange={this.handleNameChange}
                        />
                    </FormControl>
                </Form>
            </Content>
            <Buttons>
                <Button onClick={this.handleSave}>{_t('OK')}</Button>
                <Button onClick={this.handleClose}>{_t('Cancel')}</Button>
            </Buttons>
        </Window>;
    }

    componentDidMount() {
    }

    handleTypeChange(value) {
        this.setState({
            _type: value
        });
    }
    
    handleNameChange(value) {
        this.setState({
            name: value
        });
    }

    handleSave() {
        const { data, saveUrl, callback } = this.props;
        const { name, _type } = this.state;

        Ajax.post(saveUrl, {
            ID: data.ID,
            Name: name,
            Type: _type,
        }, json => {
            var obj = JSON.parse(json);
            if (obj.Code === 200) {
                callback && callback(obj);
                this.handleClose();
            } else {
                global.app.toast(_t(obj.Msg), 'warn');
            }
        });
    }

    handleClose() {
        global.app.removeElement(this);
    }
}

AddWindow.propTypes = {
    type: PropTypes.oneOf(['Name']),
    typeName: PropTypes.string,
    data: PropTypes.object,
    saveUrl: PropTypes.string,
    callback: PropTypes.func
};

AddWindow.defaultProps = {
    type: '类别名称',
    typeName: '贴图材质名称',
    data: null,
    saveUrl: null,
    callback: null
};

export default AddWindow;