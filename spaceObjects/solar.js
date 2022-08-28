import { scene , game , area, collision, shuttle, gameOverAction} from "../main.js";

export function createSolar(timestamp) {
    let solarSize = 64;
    if (timestamp - scene.lastSolarSpawn > game.solarInterval + 80000 * Math.random()) {
        let solar = document.createElement('div');
        solar.classList.add('solar');
        solar.x = area.offsetWidth - solarSize;
        solar.style.left = solar.x + 'px';
        solar.style.top = (area.offsetHeight - solarSize) * Math.random() + 'px';

        area.appendChild(solar);
        scene.lastSolarSpawn = timestamp;

    }
    let solars = document.querySelectorAll('.solar');
    solars.forEach(solar => {
        solar.x -= game.speed;
        solar.style.left = solar.x + 'px';
        if(collision(shuttle, solar)) {
            scene.hitBy = 'You were hit by a solar!';
            gameOverAction()
        }
        solar.x + solar.offsetWidth / 10 <= 0 ? solar.parentElement.removeChild(solar) : null;
    });
}