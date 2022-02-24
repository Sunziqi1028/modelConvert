

const fs = require('fs-extra');

/**
 * The main function
 */
function main() {
    const list = [
        'build/certificate',
        'build/desktop',
        'build/logs',
        'build/mongo',
        'build/public/assets',
        'build/public/build',
        'build/public/locales',
        'build/public/models',
        'build/public/temp',
        'build/public/favicon.ico',
        'build/public/index.html',
        'build/public/manifest.json',
        'build/public/sw.js',
        'build/public/view.html',
        'build/toml',
        'build/config.toml',
        'build/logs.txt',
        'build/main.js',
        'build/package.json',
        'build/ShadowEditor',
        'build/ShadowEditor.exe',
        'build/Server.exe'
    ];

    list.forEach(n => {
        if (!fs.existsSync(n)) {
            return;
        }
        fs.removeSync(n);
    });

    console.log('Done!');
}

main();