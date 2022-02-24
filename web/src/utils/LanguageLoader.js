
import {Backend, i18next} from '../third_party';

/**
 * 语言加载器
 
 */
class LanguageLoader {
    constructor() {
        window.i18next = i18next;
        window._t = i18next.t.bind(i18next);
    }

    load() {
        let lang = 'zh-CN';

        if (!lang) {
            let language = window.navigator.language.toLocaleLowerCase();

            if (language === 'zh-cn') {
                lang = 'zh-CN';
            } else {
                lang = 'en-US';
            }
            window.localStorage.setItem('lang', lang);
        }

        return new Promise(resolve => {
            i18next.use(Backend)
                .init({
                    lng: lang,
                    debug: false,

                    whitelist: ['en-US', 'zh-CN', 'zh-TW', 'ja-JP', 'ko-KR', 'ru-RU', 'fr-FR'],

                    backend: {
                        // for all available options read the backend's repository readme file
                        loadPath: 'locales/{{lng}}.json'
                    },

                    // allow keys to be phrases having `:`, `.`
                    nsSeparator: false,
                    keySeparator: false,

                    // do not load a fallback
                    fallbackLng: false
                }, (err) => {
                    if (err) {
                        console.warn(err);
                    }
                    resolve();
                });
        });
    }
}

export default LanguageLoader;