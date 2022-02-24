
import Command from './Command';

let color = new THREE.Color();

/**
 * 设置材质颜色命令
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 * @param {THREE.Object3D} object 物体
 * @param {String} attributeName 属性名称
 * @param {String} newValue integer representing a hex color value or a hex string startsWith `#`
 * @constructor
 */
class SetMaterialColorCommand extends Command {
    constructor(object, attributeName, newValue) {
        super();

        this.type = 'SetMaterialColorCommand';
        this.name = _t('Set Material') + '.' + attributeName;
        this.updatable = true;

        this.object = object;
        this.attributeName = attributeName;
        this.oldValue = object !== undefined ? this.object.material[this.attributeName].getHex() : undefined;

        if (Number.isInteger(newValue)) {
            this.newValue = newValue;
        } else { // #ffffff
            color.set(newValue);
            this.newValue = color.getHex();
        }
    }

    execute() {
        this.object.material[this.attributeName].setHex(this.newValue);
    }

    undo() {
        this.object.material[this.attributeName].setHex(this.oldValue);
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

Object.assign(SetMaterialColorCommand.prototype, {
    constructor: SetMaterialColorCommand,

    execute: function () {
        this.object.material[this.attributeName].setHex(this.newValue);
    },

    undo: function () {
        this.object.material[this.attributeName].setHex(this.oldValue);
    },

    update: function (cmd) {
        this.newValue = cmd.newValue;
    },

    toJSON: function () {
        var output = Command.prototype.toJSON.call(this);

        output.objectUuid = this.object.uuid;
        output.attributeName = this.attributeName;
        output.oldValue = this.oldValue;
        output.newValue = this.newValue;

        return output;
    },

    fromJSON: function (json) {
        Command.prototype.fromJSON.call(this, json);

        this.object = this.editor.objectByUuid(json.objectUuid);
        this.attributeName = json.attributeName;
        this.oldValue = json.oldValue;
        this.newValue = json.newValue;
    }
});

export default SetMaterialColorCommand;
