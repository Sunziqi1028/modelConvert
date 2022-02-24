
import './css/ImageButton.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 图片按钮
 
 */
class ImageButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const {className, style, src, title, selected} = this.props;
        return <button
            className={classNames('ImageButton', selected && 'selected', className)}
            style={style}
            title={title}
            onClick={this.handleClick}
        >
            <img src={src}/>
        </button>;
    }

    handleClick(event) {
        const {name, onClick} = this.props;

        onClick && onClick(name, event);
    }
}

ImageButton.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    src: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

ImageButton.defaultProps = {
    className: null,
    style: null,
    src: null,
    name: null,
    title: null,
    selected: false,
    onClick: null
};

export default ImageButton;