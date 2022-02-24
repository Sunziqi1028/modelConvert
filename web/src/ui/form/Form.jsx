
import './css/Form.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 表单
 
 */
class Form extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        const {className, style, children, direction} = this.props;
        return <form
            className={classNames('Form', direction, className)}
            style={style}
            onSubmit={this.handleSubmit}
        >
            {children}
        </form>;
    }

    handleSubmit() {
        const {onSubmit} = this.props;
        event.preventDefault();
        onSubmit && onSubmit();
    }
}

Form.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    direction: PropTypes.oneOf(['horizontal', 'vertical']),
    onSubmit: PropTypes.func
};

Form.defaultProps = {
    className: null,
    style: null,
    children: null,
    direction: 'horizontal',
    onSubmit: null
};

export default Form;