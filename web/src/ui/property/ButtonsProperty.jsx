
import './css/ButtonsProperty.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 按钮组属性
 
 */
class ButtonsProperty extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {className, style, children} = this.props;

        return <div className={classNames('buttons', className)}
                    style={style}
        >{children}</div>;
    }
}

ButtonsProperty.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

ButtonsProperty.defaultProps = {
    className: null,
    style: null,
    children: null
};

export default ButtonsProperty;