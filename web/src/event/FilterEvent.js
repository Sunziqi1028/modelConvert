
import BaseEvent from './BaseEvent';
import CssUtils from '../utils/CssUtils';
import global from '../global';

/**
 * 滤镜事件
 
 */
class FilterEvent extends BaseEvent {
    constructor() {
        super();
    }

    start() {
        global.app.on(`editorCleared.${this.id}`, this.onEditorCleared.bind(this));
        global.app.on(`optionsChanged.${this.id}`, this.onOptionsChanged.bind(this));
    }

    stop() {
        global.app.on(`editorCleared.${this.id}`, null);
        global.app.on(`optionsChanged.${this.id}`, null);
    }

    onEditorCleared() {
        global.app.editor.renderer.domElement.style.filter = '';
    }

    onOptionsChanged() {
        global.app.editor.renderer.domElement.style.filter = CssUtils.serializeFilter(global.app.options);
    }
}

export default FilterEvent;