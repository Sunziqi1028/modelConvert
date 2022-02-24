const path = require('path');
const os = require('os');
const exec = require('./exec');

/**
 * The main function
 */
async function main() {
    const rootDir = process.cwd(); // The root dir that contains `README.md`.
    const serverDir = path.join(rootDir, 'server'); // The golang server dir.

    // Build the golang server.
    console.log(`enter ${serverDir}`);
    process.chdir(serverDir);
    console.log(`build server...`);
    if (os.platform() === 'win32') {
        await exec('go', ['build', '-o', '../build/ShadowEditor.exe']);
    } else {
        await exec('go', ['build', '-o', '../build/ShadowEditor']);
    }
    console.log(`leave ${serverDir}`);
    process.chdir(rootDir);

    // done
    console.log('Done!');
}

main();