/**
 * JS下载器
 */
class JsLoader {
    constructor() {
        this.assets = [];
    }

    load(url) {
        var data = {
            url,
            script: null
        };
        this.assets.push(data);
        return new Promise(resolve => {
            fetch(url).then(response => {
                if (response.ok) {
                    response.text().then(text => {
                        data.script = text;
                        resolve(data);
                    });
                } else {
                    console.warn(`JsLoader: ${url} loaded failed.`);
                    resolve(null);
                }
            }).catch(() => {
                console.warn(`JsLoader: ${url} loaded failed.`);
                resolve(null);
            });
        });
    }

    eval() {
        var eval2 = eval;

        var script = '';

        this.assets.forEach(n => {
            if (n.script) {
                script += n.script + '\n';
            }
        });

        if (script) {
            eval2.call(window, script);
        }
    }
}

export default JsLoader;