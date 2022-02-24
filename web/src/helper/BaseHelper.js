
var ID = -1;

/**
 * 帮助器基类
 
 */
class BaseHelper {
    constructor() {
        this.id = `${this.constructor.name}${ID--}`;
    }

    /**
     * 帮助器开始运行
     * @description 因为start是在`appStarted`事件中运行的，所以无法监听到`appStart`和`appStarted`事件
     */
    start() {

    }

    /**
     * 帮助器结束运行
     */
    stop() {

    }
}

export default BaseHelper;