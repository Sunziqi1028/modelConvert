
import BaseEvent from './BaseEvent';
import global from '../global';

/**
 * 脚本改变事件
 
 */
class ScriptChangedEvent extends BaseEvent {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    start() {
        global.app.on(`scriptChanged.${this.id}`, this.handleChange);
    }

    stop() {
        global.app.on(`scriptChanged.${this.id}`, null);
    }

    handleChange() {
        global.app.call('send', this, {
            type: 'changeScript',
            scripts: global.app.editor.scripts
        });
    }
}

export default ScriptChangedEvent;