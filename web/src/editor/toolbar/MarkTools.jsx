
import { ToolbarSeparator, IconButton } from '../../ui/index';
import PointMarkTool from '../tools/PointMarkTool';
import global from '../../global';

/**
 * 标注工具
 
 */
class MarkTools extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAddPointMark: false,
            isAddLineMark: false,
            isAddPolygonMark: false
        };

        this.handleStartPointMarkTool = this.handleStartPointMarkTool.bind(this);
        this.handleStartLineMarkTool = this.handleStartLineMarkTool.bind(this);
        this.handleStartPolygonMarkTool = this.handleStartPolygonMarkTool.bind(this);
    }

    render() {
        const { isAddPointMark, isAddLineMark, isAddPolygonMark } = this.state;

        return <>
            <IconButton
                icon={'point-mark'}
                title={_t('Point Mark')}
                selected={isAddPointMark}
                onClick={this.handleStartPointMarkTool}
            />
            <IconButton
                icon={'line-mark'}
                title={_t('Line Mark')}
                selected={isAddLineMark}
                onClick={this.handleStartLineMarkTool}
            />
            <IconButton
                icon={'polygon-mark'}
                title={_t('Polygon Mark')}
                selected={isAddPolygonMark}
                onClick={this.handleStartPolygonMarkTool}
            />
            <ToolbarSeparator />
        </>;
    }

    handleStartPointMarkTool() {
        if (this.pointMarkTool === undefined) {
            this.pointMarkTool = new PointMarkTool();
            this.pointMarkTool.on(`end`, () => {
                global.app.editor.gpuPickNum--;
                this.setState({
                    isAddPointMark: false
                });
            });
        }
        this.pointMarkTool.start();
        global.app.editor.gpuPickNum++;
        this.setState({
            isAddPointMark: true
        });
    }

    handleStartLineMarkTool() {

    }

    handleStartPolygonMarkTool() {

    }
}

export default MarkTools;