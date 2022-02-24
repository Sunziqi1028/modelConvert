
import './css/TableRow.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

/**
 * 表格行
 
 */
class TableRow extends React.Component {
    render() {
        const {className, style, children, ...others} = this.props;

        return <tr
            className={classNames('TableRow', className)}
            style={style}
            {...others}
        >
            {children}
        </tr>;
    }
}

TableRow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

TableRow.defaultProps = {
    className: null,
    style: null,
    children: null
};

export default TableRow;