
import './css/MapPanel.css';
import { classNames, PropTypes } from '../../third_party';
import { SearchField, ImageList, ContextMenu, MenuItem, IconButton } from '../../ui/index';
import AddWindow from './window/AddWindow.jsx';
import global from '../../global';

/**
 * 贴图材质通道面板
 
 */
class MaterialTypePanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            name: '',
        };

        this.handleClick = this.handleClick.bind(this);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.update = this.update.bind(this);
    }

    render() {
        const { className, style } = this.props;
        const { data, name } = this.state;
        const { enableAuthority, authorities } = global.app.server;

        let list = data;

        if (name.trim() !== '') {
            list = list.filter(n => {
                return n.Name.toLowerCase().indexOf(name.toLowerCase()) > -1 ||
                    n.FirstPinYin.toLowerCase().indexOf(name.toLowerCase()) > -1 ||
                    n.TotalPinYin.toLowerCase().indexOf(name.toLowerCase()) > -1;
            });
        }

        const imageListData = list.map(n => {
            return Object.assign({}, n, {
                id: n.ID + '',
                src: n.Thumbnail ? `${global.app.options.server}${n.Thumbnail}` : null,
                title: n.Name,
                icon: 'scenes'
            });
        });

        return <div className={classNames('MapPanel', className)}
            style={style}
               >
            <div className="toolbar">
                <IconButton
                    className={'add'}
                    icon={'add'}
                    onClick={this.handleAdd}
                    show={!enableAuthority || authorities.includes('ADD_MAP')}
                >
                </IconButton>
            </div>
            <ImageList
                data={imageListData}
                showEditButton={!enableAuthority || authorities.includes('EDIT_MAP')}
                showDeleteButton={!enableAuthority || authorities.includes('DELETE_MAP')}
                onClick={this.handleClick}
                onEdit={this.handleEdit}
                onDelete={this.handleDelete}
            />
        </div>;
    }

    componentDidUpdate() {
        if (this.init === undefined && this.props.show === true) {
            this.init = true;
            this.update();
        }
    }

    update() {
        fetch(`${global.app.options.server}/api/MaterialType/List`).then(response => {
            response.json().then(obj => {
                if (obj.Code !== 200) {
                    global.app.toast(_t(obj.Msg), 'warn');
                    return;
                }
                this.setState({
                    data: obj.Data
                });
            });
        });
    }

    handleClick(data) {
        global.app.call(`selectMap`, this, data);
    }

    // ------------------------------- 添加 ---------------------------------------
    handleAdd() {
        let data = {
            "Type": '',
            "Name": '',
        };
        const win = global.app.createElement(AddWindow, {
            type: 'Name',
            typeName: '材质通道类型名称',
            data,
            saveUrl: `${global.app.options.server}/api/MaterialType/Save`,
            callback: this.update
        });

        global.app.addElement(win);
    }

    // ------------------------------- 编辑 ---------------------------------------

    handleEdit(data) {
        const win = global.app.createElement(AddWindow, {
            type: 'Name',
            typeName: '材质通道类型名称',
            data,
            saveUrl: `${global.app.options.server}/api/MaterialType/Edit`,
            callback: this.update
        });

        global.app.addElement(win);
    }

    // ------------------------------ 删除 ----------------------------------------

    handleDelete(data) {
        global.app.confirm({
            title: _t('Confirm'),
            content: `${_t('Delete')} ${data.title}?`,
            onOK: () => {
                fetch(`${global.app.options.server}/api/MaterialType/Delete?ID=${data.id}`, {
                    method: 'POST'
                }).then(response => {
                    response.json().then(obj => {
                        if (obj.Code === 200) {
                            this.update();
                        }
                        global.app.toast(_t(obj.Msg));
                    });
                });
            }
        });
    }
}

MaterialTypePanel.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool
};

MaterialTypePanel.defaultProps = {
    className: null,
    style: null,
    show: false
};

export default MaterialTypePanel;