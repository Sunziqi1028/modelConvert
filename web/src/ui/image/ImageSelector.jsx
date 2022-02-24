
import './css/ImageSelector.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 图片选取控件
 
 */
class ImageSelector extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const {className, style, value, noImageText} = this.props;

        if (value) {
            return <img
                className={classNames('ImageSelector', className)}
                style={style}
                src={value}
                onClick={this.handleSelect}
            />;
        } else {
            return <div
                className={classNames('ImageSelector', 'empty', className)}
                style={style}
                onClick={this.handleSelect}
            >
                {noImageText}
            </div>;
        }
    }

    componentDidMount() {
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.addEventListener('change', this.handleChange);

        document.body.appendChild(input);

        this.input = input;
    }

    componentWillUnmount() {
        var input = this.input;
        input.removeEventListener('change', this.handleChange);

        document.body.removeChild(input);

        this.input = null;
    }

    handleSelect() {
        this.input.click();
    }

    handleChange(event) {
        const {name, onChange} = this.props;

        onChange && onChange(name, event.target.files[0], event);
    }
}

ImageSelector.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    name: PropTypes.string,
    value: PropTypes.any,
    noImageText: PropTypes.string,
    onChange: PropTypes.func
};

ImageSelector.defaultProps = {
    className: null,
    style: null,
    name: null,
    value: null,
    noImageText: 'No Image',
    onChange: null
};

export default ImageSelector;