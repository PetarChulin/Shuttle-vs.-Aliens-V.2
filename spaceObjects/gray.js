import { scene, game, area, collision, shuttle, gameOverAction, hitBy } from '../main.js'

export function createGray(timestamp) {
    let graySize = 200;
    let bangs = document.querySelectorAll('.bang');

    if (scene.score > 1200 && timestamp - scene.lastGraySpawn > game.grayInterval + 80000 * Math.random()) {
        let gray = document.createElement('div')
        gray.classList.add('gray');
        scene.grayBlood == 0 ? scene.grayBlood = 5 : null;
        gray.x = area.offsetWidth - graySize;
        gray.style.left = (area.offsetWidth - graySize) * Math.random() + 'px';
        gray.style.top = (area.offsetHeight - graySize) * Math.random() + 'px';
        gray.textContent = 'hit me 5 times';

        setTimeout(function () {
            gray.textContent = '';
        }, 5000);

        setTimeout(function () {
            gray.remove();
            scene.grayBlood = 5;
        }, 10000);

        area.appendChild(gray);
        scene.lastGraySpawn = timestamp;
    }

    let grays = document.querySelectorAll('.gray');
    grays.forEach(gray => {

        gray.style.left = gray.x + 'px';

        if (collision(gray, shuttle)) {
            scene.hitBy = 'You were hit by a gray';
            gameOverAction();
        }

        bangs.forEach(bang => {
            if (collision(bang, gray)) {
                area.removeChild(bang);
                scene.grayBlood--;
                gray.innerHTML = scene.grayBlood;
                scene.score += 100;
            }
            if (scene.grayBlood == 4) {
                gray.style.height = '180px';
                gray.style.width = '180px';
            } else if (scene.grayBlood == 3) {
                gray.style.height = '120px';
                gray.style.width = '120px';
            } else if (scene.grayBlood == 2) {
                gray.style.height = '96px';
                gray.style.width = '96px';
            }
            scene.grayBlood <= 0 ? (gray.parentElement.removeChild(gray), scene.grayKillsCount++) : null;
        });
    });
}
