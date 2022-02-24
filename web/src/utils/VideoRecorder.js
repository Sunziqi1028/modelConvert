import TimeUtils from './TimeUtils';
import global from '../global';

/**
 * 视频录制器
 */
class VideoRecorder {
    constructor() {
        this.chunks = [];

        this.recorder = null;

        this.running = false;

        this.onDataAvailable = this.onDataAvailable.bind(this);
    }

    start() {
        if (!navigator.mediaDevices) {
            global.app.toast(`Record is not supported!`, 'error');
            return new Promise(resolve => {
                resolve(false);
            });
        }

        return new Promise(resolve => {
            navigator.mediaDevices.getDisplayMedia()
                .then(stream => {
                    this.recorder = new MediaRecorder(stream);
                    this.recorder.ondataavailable = this.onDataAvailable;
                    this.recorder.start();
                    this.running = true;
                    resolve(true);
                })
                .catch(() => {
                    this.running = false;
                    resolve(false);
                });
        });
    }

    stop() {
        return new Promise(resolve => {
            this.recorder.onstop = () => {
                this.recorder.ondataavailable = null;
                this.recorder.onstop = null;

                this.running = false;

                const file = new File(this.chunks, TimeUtils.getDateTime() + '.webm');

                let form = new FormData();
                form.global.append('file', file);

                fetch(`/api/Video/Add`, {
                    method: 'POST',
                    body: form
                }).then(response => {
                    response.json().then(obj => {
                        if (obj.Code !== 200) {
                            global.app.toast(_t(obj.Msg), 'warn');
                            return;
                        }
                        global.app.toast(_t(obj.Msg), 'success');
                        this.chunks.length = 0;
                        resolve(true);
                    });
                });
            };

            this.recorder.stop();
        }).catch(() => {
            this.running = false;
            resolve(false);
        });
    }

    onDataAvailable(e) {
        this.chunks.push(e.data);
    }
}

export default VideoRecorder;