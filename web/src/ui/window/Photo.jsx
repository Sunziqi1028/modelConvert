
import './css/Photo.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 图片查看器
 */
class Photo extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this, props.onClick);
        this.handleClickImage = this.handleClickImage.bind(this);
    }

    render() {
        const {className, style, url} = this.props;

        return <div className={classNames('PhotoMark', className)}
                    style={style}
                    onClick={this.handleClick}
        >
            <img src={url}
                 onClick={this.handleClickImage}
            />
        </div>;
    }

    handleClick(onClick, event) {
        onClick && onClick(event);
    }

    handleClickImage(event) {
        event.stopPropagation();
    }
}

Photo.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    url: PropTypes.string,
    onClick: PropTypes.func
};

Photo.defaultProps = {
    className: null,
    style: null,
    url: null,
    onClick: null
};

export default Photo;