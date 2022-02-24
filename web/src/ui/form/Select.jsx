
import './css/Select.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 输入框
 
 */
class Select extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const {className, style, options, value, disabled} = this.props;

        return <select
            className={classNames('Select', className)}
            style={style}
            value={value}
            disabled={disabled}
            onChange={this.handleChange}
        >
            {options && Object.keys(options).map(n => {
                return <option value={n}
                               key={n}
                >{options[n]}</option>;
            })}
        </select>;
    }

    handleChange(event) {
        const {onChange} = this.props;

        const selectedIndex = event.target.selectedIndex;

        if (selectedIndex === -1) {
            onChange && onChange(null, event);
            return;
        }

        const value = event.target.options[selectedIndex].value;

        // 注意：options的key一定是字符串，所以value也一定是字符串
        onChange && onChange(value, this.props.name, event);
    }
}

Select.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    options: PropTypes.object,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func
};

Select.defaultProps = {
    className: null,
    style: null,
    options: null,
    name: null,
    value: null,
    disabled: false,
    onChange: null
};

export default Select;