
import PackageManager from '../package/PackageManager';

var ID = -1;

/**
 * BaseLoader
 
 */
class BaseLoader {
    constructor() {
        this.id = `BaseLoader${ID--}`;

        this.packageManager = new PackageManager();
        this.require = this.packageManager.require.bind(this.packageManager);
    }

    load(url, options) { // eslint-disable-line
        return new Promise(resolve => {
            resolve(null);
        });
    }
}

export default BaseLoader;