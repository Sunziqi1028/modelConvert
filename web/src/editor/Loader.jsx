import './css/Loader.css';
import { LoadMask } from '../ui/index';

/**
 * 载入页面
 */
class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <LoadMask text={_t('载入中...')} />;
    }
}

export default Loader;