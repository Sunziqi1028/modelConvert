
import './css/SVG.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * SVG
 
 */
class SVG extends React.Component {
    render() {
        const {className, style, ...others} = this.props;

        return <svg
            className={classNames('SVG', className)}
            style={style}
            {...others}
        />;
    }
}

SVG.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

SVG.defaultProps = {
    className: null,
    style: null
};

export default SVG;