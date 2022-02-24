

const path = require('path');
const fs = require('fs-extra');

/**
 * The main function
 */
async function main() {
    const rootDir = process.cwd(); // The root dir that contains `README.md`.
    const webDir = path.join(rootDir, 'web'); // The web dir.

    process.chdir(webDir);
    console.log(`copy files...`);
    fs.copySync('./assets', '../build/public/assets');
    fs.copySync('./locales', '../build/public/locales');
    fs.copyFileSync('./favicon.ico', '../build/public/favicon.ico');
    fs.copyFileSync('./index.html', '../build/public/index.html');
    fs.copyFileSync('./manifest.json', '../build/public/manifest.json');
    fs.copyFileSync('./sw.js', '../build/public/sw.js');
    fs.copyFileSync('./view.html', '../build/public/view.html');
    console.log('Done!');
}

main();