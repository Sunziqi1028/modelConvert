
import PlayerComponent from '../component/PlayerComponent';

/**
 * 粒子动画控制器
 * @param {*} app 播放器
 */
class ParticleAnimator extends PlayerComponent {
    constructor(app) {
        super(app);
    }

    create(scene, camera, renderer) { // eslint-disable-line
        this.scene = scene;

        return new Promise(resolve => {
            resolve();
        });
    }

    update(clock, deltaTime, time) { // eslint-disable-line
        var elapsed = clock.elapsedTime;

        this.scene.children.forEach(n => {
            if (n.userData.type === 'Fire') {
                n.userData.fire.update(elapsed);
            } else if (n.userData.type === 'Smoke') {
                n.update(elapsed);
            } else if (n.userData.type === 'Water') {
                n.update();
            } else if (n.userData.type === 'ParticleEmitter') {
                n.userData.group.tick(deltaTime);
            } else if (n.userData.type === 'Cloth') {
                n.update();
            }
        });
    }

    dispose() {
        this.scene = null;
    }
}

export default ParticleAnimator;