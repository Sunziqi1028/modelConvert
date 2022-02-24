
import './css/VBoxLayout.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 竖直布局
 
 */
class VBoxLayout extends React.Component {
    render() {
        const {className, style, children, ...others} = this.props;

        return <div
            className={classNames('VBoxLayout', className)}
            style={style}
            {...others}
        >{children}</div>;
    }
}

VBoxLayout.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

VBoxLayout.defaultProps = {
    className: null,
    style: null,
    children: null
};

export default VBoxLayout;