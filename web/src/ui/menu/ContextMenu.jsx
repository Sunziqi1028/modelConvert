
import './css/ContextMenu.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 上下文菜单
 
 */
class ContextMenu extends React.Component {
    render() {
        const {className, style, children} = this.props;

        return <ul
            className={classNames('ContextMenu', className)}
            style={style}
        >{children}</ul>;
    }
}

ContextMenu.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

ContextMenu.defaultProps = {
    className: null,
    style: null,
    children: null
};

export default ContextMenu;