
import { PropertyGroup, ButtonProperty, SelectProperty } from '../../ui/index';
import global from '../../global';

/**
 * LMesh组件
 
 */
class LMeshComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;
        this.isPlaying = false;

        this.state = {
            show: false,
            expanded: true,
            options: [],
            animation: '',
            previewText: _t('Preview')
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.onAnimate = this.onAnimate.bind(this);
    }

    render() {
        const { show, expanded, options, animation, previewText } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={_t('LMesh Component')}
            show={show}
            expanded={expanded}
            onExpand={this.handleExpand}
               >
            <SelectProperty label={_t('Animation')}
                name={'animation'}
                options={options}
                value={animation}
                onChange={this.handleChange}
            />
            <ButtonProperty text={previewText}
                onChange={this.handlePreview}
            />
        </PropertyGroup>;
    }

    componentDidMount() {
        global.app.on(`objectSelected.LMeshComponent`, this.handleUpdate);
        global.app.on(`objectChanged.LMeshComponent`, this.handleUpdate);
    }

    handleExpand(expanded) {
        this.setState({
            expanded
        });
    }

    handleUpdate() {
        const editor = global.app.editor;

        if (!editor.selected || !(editor.selected.userData.type === 'lol')) {
            this.setState({
                show: false
            });
            return;
        }

        this.selected = editor.selected;

        const model = this.selected.userData.model;
        const animNames = model.getAnimations();

        let options = {

        };

        animNames.forEach(n => {
            options[n] = n;
        });

        this.setState({
            show: true,
            options,
            animation: animNames[0],
            previewText: this.isPlaying ? _t('Cancel') : _t('Preview')
        });
    }

    handleChange(value) {
        const model = this.selected.userData.model;

        model.setAnimation(value);

        this.setState({ animation: value });
    }

    handlePreview() {
        if (this.isPlaying) {
            this.stopPreview();
        } else {
            this.startPreview();
        }
    }

    startPreview() {
        const animation = this.state.animation;

        if (!animation) {
            global.app.toast(`Please select animation.`);
            return;
        }

        this.isPlaying = true;

        this.setState({
            previewText: _t('Cancel')
        });

        const model = this.selected.userData.model;
        model.setAnimation(animation);

        global.app.on(`animate.LMeshComponent`, this.onAnimate);
    }

    stopPreview() {
        this.isPlaying = false;

        this.setState({
            previewText: _t('Preview')
        });

        global.app.on(`animate.LMeshComponent`, null);
    }

    onAnimate(clock) {
        var model = this.selected.userData.model;
        model.update(clock.elapsedTime * 1000);
    }
}

export default LMeshComponent;