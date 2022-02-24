
import './css/EditUserWindow.css';
import { PropTypes } from '../../../third_party';
import { Window, Content, Buttons, Form, FormControl, Label, Input, Button, Select } from '../../../ui/index';
import SelectDeptWindow from '../dept/SelectDeptWindow.jsx';
import global from '../../../global';

/**
 * 用户编辑窗口
 
 */
class EditUserWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            username: props.username,
            password: '',
            confirmPassword: '',
            name: props.name,
            roles: {},
            roleID: props.roleID,
            deptID: props.deptID,
            deptName: props.deptName
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectDept = this.handleSelectDept.bind(this);
        this.commitSelectDept = this.commitSelectDept.bind(this);
        this.handleSave = this.handleSave.bind(this, props.callback);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const { id, username, password, confirmPassword, name, roles, roleID, deptName } = this.state;

        return <Window
            className={_t('EditUserWindow')}
            title={id ? _t('Edit User') : _t('Add User')}
            style={{ width: '320px', height: '280px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content>
                <Form>
                    <FormControl>
                        <Label>{_t('User Name')}</Label>
                        <Input name={'username'}
                            value={username}
                            onChange={this.handleChange}
                        />
                        <input type={'text'}
                            className={'fake'}
                        />
                        <input type={'password'}
                            className={'fake'}
                        />
                    </FormControl>
                    <FormControl hidden={id !== ''}>
                        <Label>{_t('Password')}</Label>
                        <Input name={'password'}
                            type={'password'}
                            value={password}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl hidden={id !== ''}>
                        <Label>{_t('Confirm Password')}</Label>
                        <Input name={'confirmPassword'}
                            type={'password'}
                            value={confirmPassword}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <Label>{_t('NickName')}</Label>
                        <Input name={'name'}
                            value={name}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <Label>{_t('Role')}</Label>
                        <Select name={'roleID'}
                            options={roles}
                            value={roleID}
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <Label>{_t('Department')}</Label>
                        <Input className={'deptName'}
                            name={'deptName'}
                            value={deptName}
                            disabled
                            onChange={this.handleChange}
                        />
                        <Button className={'select'}
                            onClick={this.handleSelectDept}
                        >{_t('Select')}</Button>
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
        fetch(`${global.app.options.server}/api/Role/List?pageSize=10000`).then(response => {
            response.json().then(obj => {
                if (obj.Code !== 200) {
                    global.app.toast(_t(obj.Msg), 'warn');
                    return;
                }
                const roles = {
                    '': _t('Please Select')
                };
                obj.Data.rows.forEach(n => {
                    roles[n.ID] = this.renderRoleName(n.Name);
                });
                this.setState({
                    roles
                });
            });
        });
    }

    handleChange(value, name) {
        this.setState({
            [name]: value
        });
    }

    handleSelectDept() {
        const win = global.app.createElement(SelectDeptWindow, {
            callback: this.commitSelectDept
        });
        global.app.addElement(win);
    }

    commitSelectDept(deptID, deptName) {
        this.setState({
            deptID,
            deptName
        });
    }

    handleSave(callback) {
        const { id, username, password, confirmPassword, name, roleID, deptID } = this.state;

        if (!username || username.trim() === '') {
            global.app.toast(_t('Username is not allowed to be empty.'), 'warn');
            return;
        }

        if (!id && (!password || password.trim() === '')) {
            global.app.toast(_t('Password is not allowed to be empty.'), 'warn');
            return;
        }

        if (!id && (!confirmPassword || confirmPassword.trim() === '')) {
            global.app.toast(_t('Confirm password is not allowed to be empty.'), 'warn');
            return;
        }

        if (!id && password !== confirmPassword) {
            global.app.toast(_t('Password and confirm password is not the same.'), 'warn');
            return;
        }

        if (!name || name.trim() === '') {
            global.app.toast(_t('Nick name is not allowed to be empty.'), 'warn');
            return;
        }

        const url = !id ? `/api/User/Add` : `/api/User/Edit`;

        fetch(`${global.app.options.server}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `ID=${id}&Username=${username}&Password=${password}&Name=${name}&RoleID=${roleID}&DeptID=${deptID}`
        }).then(response => {
            response.json().then(json => {
                if (json.Code !== 200) {
                    global.app.toast(_t(json.Msg), 'warn');
                    return;
                }
                this.handleClose();
                callback && callback();
            });
        });
    }

    handleClose() {
        global.app.removeElement(this);
    }

    renderRoleName(value) {
        if (value === 'Administrator' ||
            value === 'User' ||
            value === 'Guest') {
            return _t(value);
        }
        return value;
    }
}

EditUserWindow.propTypes = {
    id: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
    roleID: PropTypes.string,
    deptID: PropTypes.string,
    deptName: PropTypes.string,
    callback: PropTypes.func
};

EditUserWindow.defaultProps = {
    id: '',
    username: '',
    name: '',
    roleID: '',
    deptID: '',
    deptName: '',
    callback: null
};

export default EditUserWindow;