
import './css/IconMenuButton.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 带下拉菜单的图标按钮
 
 */
class IconMenuButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const {className, style, children, icon, title, show, selected} = this.props;
        return <div className={classNames('IconMenuButton', selected && 'selected', !show && 'hidden', className)}
                    style={style}
        >
            <button
                className={'button'}
                title={title}
                onClick={this.handleClick}
            >
                <i className={classNames('iconfont', icon && 'icon-' + icon)}/>
            </button>
            <div className={'menu'}>
                {children}
            </div>
        </div>;
    }

    handleClick(event) {
        const {name, onClick} = this.props;
        onClick && onClick(name, event);
    }
}

IconMenuButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    icon: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    show: PropTypes.bool,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

IconMenuButton.defaultProps = {
    className: null,
    style: null,
    children: null,
    icon: null,
    name: null,
    title: null,
    show: true,
    selected: false,
    onClick: null
};

export default IconMenuButton;