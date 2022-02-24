
import './css/TypefaceManagementWindow.css';
import { Window, Content, Buttons, Button, DataGrid, Column, Toolbar, VBoxLayout } from '../../../ui/index';
import global from '../../../global';

/**
 * 字体管理器窗口
 
 */
class TypefaceManagementWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selected: null,
            mask: false
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    render() {
        const { data, selected, mask } = this.state;

        return <Window
            className={'TypefaceManagementWindow'}
            title={_t('Typeface Management')}
            style={{ width: '400px', height: '320px' }}
            mask={false}
            onClose={this.handleClose}
               >
            <Content>
                <VBoxLayout>
                    <Toolbar>
                        <Button onClick={this.handleAdd}>{_t('Add')}</Button>
                        <Button onClick={this.handleDelete}>{_t('Delete')}</Button>
                    </Toolbar>
                    <DataGrid data={data}
                        selected={selected}
                        mask={mask}
                        keyField={'ID'}
                        onSelect={this.handleSelect}
                    >
                        <Column type={'number'} />
                        <Column field={'Name'}
                            title={_t('Name')}
                        />
                        <Column field={'CreateTime'}
                            title={_t('Create Time')}
                            width={160}
                        />
                    </DataGrid>
                </VBoxLayout>
            </Content>
            <Buttons>
                <Button onClick={this.handleClose}>{_t('Close')}</Button>
            </Buttons>
        </Window>;
    }

    componentDidMount() {
        this.update();
    }

    update() {
        this.setState({
            mask: true
        });
        fetch(`${global.app.options.server}/api/Typeface/List`).then(response => {
            response.json().then(json => {
                this.setState({
                    data: json.Data,
                    mask: false
                });
            });
        });
    }

    handleAdd() {
        global.app.upload(`${global.app.options.server}/api/Typeface/Add`, obj => {
            if (obj.Code === 200) {
                this.update();
            }
            global.app.toast(_t(obj.Msg));
        });
    }

    handleDelete() {
        const selected = this.state.selected;

        if (!selected) {
            global.app.toast(_t('Please select a record.'));
            return;
        }

        global.app.confirm({
            title: _t('Query'),
            content: _t('Delete the selected record?'),
            onOK: () => {
                this.commitDelete(selected);
            }
        });
    }

    commitDelete(id) {
        fetch(`${global.app.options.server}/api/Typeface/Delete?ID=${id}`, {
            method: 'POST'
        }).then(response => {
            response.json().then(obj => {
                if (obj.Code !== 200) {
                    global.app.toast(_t(obj.Msg), 'warn');
                    return;
                }
                this.update();
                global.app.toast(_t(obj.Msg), 'success');
            });
        });
    }

    handleSelect(record) {
        this.setState({
            selected: record.ID
        });
    }

    handleClose() {
        global.app.removeElement(this);
    }
}

export default TypefaceManagementWindow;