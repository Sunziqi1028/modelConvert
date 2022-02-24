
import './css/ResetPasswordWindow.css';
import { PropTypes } from '../../../third_party';
import { Window, Content, Buttons, Form, FormControl, Label, Input, Button } from '../../../ui/index';
import global from '../../../global';

/**
 * 重置密码窗口
 
 */
class ResetPasswordWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            newPassword: '',
            confirmPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const { newPassword, confirmPassword } = this.state;

        return <Window
            className={_t('ResetPasswordWindows')}
            title={_t('Reset Password')}
            style={{ width: '320px', height: '200px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content>
                <Form>
                    <FormControl>
                        <Label>{_t('New Password')}</Label>
                        <Input name={'newPassword'}
                            type={'password'}
                            value={newPassword}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <Label>{_t('Confirm Password')}</Label>
                        <Input name={'confirmPassword'}
                            type={'password'}
                            value={confirmPassword}
                            onChange={this.handleChange}
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

    handleChange(value, name) {
        this.setState({
            [name]: value
        });
    }

    handleSave() {
        const { id, newPassword, confirmPassword } = this.state;

        if (!newPassword || newPassword.trim() === '') {
            global.app.toast(_t('New password is not allowed to be empty.'), 'warn');
            return;
        }

        if (!confirmPassword || confirmPassword.trim() === '') {
            global.app.toast(_t('Confirm password is not allowed to be empty.'), 'warn');
            return;
        }

        if (newPassword !== confirmPassword) {
            global.app.toast(_t('New password and confirm password is not the same.'), 'warn');
            return;
        }

        fetch(`${global.app.options.server}/api/User/ResetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `UserID=${id}&NewPassword=${newPassword}&ConfirmPassword=${confirmPassword}`
        }).then(response => {
            response.json().then(obj => {
                if (obj.Code !== 200) {
                    global.app.toast(_t(obj.Msg), 'warn');
                    return;
                }
                global.app.toast(_t(obj.Msg), 'success');
                this.handleClose();
            });
        });
    }

    handleClose() {
        global.app.removeElement(this);
    }
}

ResetPasswordWindow.propTypes = {
    id: PropTypes.string
};

ResetPasswordWindow.defaultProps = {
    id: ''
};

export default ResetPasswordWindow;