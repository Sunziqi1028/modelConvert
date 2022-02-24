
import './css/LoadMask.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 加载动画
 
 */
class LoadMask extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {className, style, show, text} = this.props;

        return <div className={classNames('LoadMask', className, !show && 'hidden')}
                    style={style}
        >
            <div className={'box'}>
                <div className={'msg'}>{text}</div>
            </div>
        </div>;
    }
}

LoadMask.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool,
    text: PropTypes.string
};

LoadMask.defaultProps = {
    className: null,
    style: null,
    show: true,
    text: 'Waiting...'
};

export default LoadMask;