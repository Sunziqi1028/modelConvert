
import './css/AssetsPanel.css';

import { AccordionLayout, Accordion } from '../../ui/index';

import ScenePanel from './ScenePanel.jsx';
import ModelPanel from './ModelPanel.jsx';
import MapPanel from './MapPanel.jsx';
import MaterialPanel from './MaterialPanel.jsx';
import MaterialTypePanel from './MaterialTypePanel.jsx';
import ParticlePanel from './ParticlePanel.jsx';
import PrefabPanel from './PrefabPanel.jsx';
import global from '../../global';

/**
 * 资源面板
 */
class AssetsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeIndex: 0,
            sceneCount: 0,
            meshCount: 0,
            mapCount: 0,
            materialCount: 0,
            materialTypeCount: 0,
            particleCount: 0,
            prefabCount: 0,
            characterCount: 0
        };

        this.handleActive = this.handleActive.bind(this);
    }

    render() {
        const { activeIndex, sceneCount, meshCount, mapCount, materialCount, materialTypeCount, particleCount, prefabCount } = this.state;

        const { enableAuthority, isLogin, authorities } = global.app.server;

        let index = 0;

        return <AccordionLayout className={'AssetsPanel'}
            onActive={this.handleActive}
               >
            {!enableAuthority || authorities.includes('LIST_MESH') ? <Accordion name={'Model'}
                title={`${_t('Model')}(${meshCount})`}
                maximizable
                                                                     >
                <ModelPanel className={'subPanel'}
                    show={index++ === activeIndex}
                />
            </Accordion> : null}
            {/* {!enableAuthority || authorities.includes('LIST_MATERIAL_TYPE') ? <Accordion name={'贴图材质分类'}
                title={`${_t('材质通道类型')}(${materialTypeCount})`}
                maximizable
                                                                         >
                <MaterialTypePanel className={'subPanel'}
                    show={index++ === activeIndex}
                />
            </Accordion> : null} */}
        </AccordionLayout>;
    }

    componentDidMount() {
        this.update();
    }

    update() {
        fetch(`${global.app.options.server}/api/Assets/List`).then(response => {
            if (response.ok) {
                response.json().then(obj => {
                    if (obj.Code !== 200) {
                        global.app.toast(_t(obj.Msg), 'warn');
                        return;
                    }
                    this.setState(obj);
                });
            }
        });
    }

    handleActive(index) {
        this.setState({
            activeIndex: index
        });
    }
}

export default AssetsPanel;