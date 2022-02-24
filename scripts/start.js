const os = require('os');
const exec = require('./exec');

/**
 * The main function
 */
async function main() {
    await exec('./ShadowEditor', ['serve', '--config', './config.toml'], {
        cwd: './build'
    });
}

main();