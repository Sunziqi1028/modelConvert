
var ID = -1;

/**
 * 事件基类
 
 */
class BaseEvent {
    constructor() {
        this.id = `${this.constructor.name}${ID--}`;
    }

    start() {

    }

    stop() {

    }
}

export default BaseEvent;