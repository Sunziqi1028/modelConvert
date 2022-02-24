
import Command from './Command';
import global from '../global';

/**
 * 设置颜色命令
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 * @param {THREE.Object3D} object 物体
 * @param {String} attributeName 属性名称
 * @param {Object} newValue HEX颜色值
 * @constructor
 */
class SetColorCommand extends Command {
    constructor(object, attributeName, newValue) {
        super();
        this.type = 'SetColorCommand';
        this.name = _t('Set') + ' ' + attributeName;
        this.updatable = true;

        this.object = object;
        this.attributeName = attributeName;
        this.oldValue = object !== undefined ? this.object[this.attributeName].getHex() : undefined;
        this.newValue = newValue;
    }

    execute() {
        this.object[this.attributeName].setHex(this.newValue);
        global.app.call('objectChanged', this, this.object);
    }

    undo() {
        this.object[this.attributeName].setHex(this.oldValue);
        global.app.call('objectChanged', this, this.object);
    }

    update(cmd) {
        this.newValue = cmd.newValue;
    }

    toJSON() {
        var output = Command.prototype.toJSON.call(this);

        output.objectUuid = this.object.uuid;
        output.attributeName = this.attributeName;
        output.oldValue = this.oldValue;
        output.newValue = this.newValue;

        return output;
    }

    fromJSON(json) {
        super.fromJSON(json);

        this.object = this.editor.objectByUuid(json.objectUuid);
        this.attributeName = json.attributeName;
        this.oldValue = json.oldValue;
        this.newValue = json.newValue;
    }
}

export default SetColorCommand;