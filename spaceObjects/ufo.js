import { scene , game , area, collision, shuttle , gameOverAction} from "../main.js";

let image;
export function createUfo(timestamp) {
    let ufoSize = 100;
    let bangs = document.querySelectorAll('.bang');
    if (timestamp - scene.lastUfoSpawn > game.ufosInterval + 40000 * Math.random()) {
        let ufo = document.createElement('div');
        image = document.createElement('img');
        ufo.classList.add('ufo');
        ufo.x = area.offsetWidth - ufoSize;
        ufo.style.left = ufo.x + 'px';
        ufo.style.top = (area.offsetHeight - ufoSize) * Math.random() + 'px';

        ufo.appendChild(image);
        area.appendChild(ufo);
        scene.lastUfoSpawn = timestamp;
        chooseUfo();
    }
    let ufos = document.querySelectorAll('.ufo');
    ufos.forEach(ufo => {
        ufo.x -= game.speed;
        ufo.style.left = ufo.x + 'px';

        if(collision(shuttle, ufo)) {
            scene.score -= 10
            if(scene.score < 0) {
                scene.hitBy = 'You run out of points!';
                gameOverAction();
            }
        }

    });
    
    ufos.forEach(ufo => {
        if (ufo.x + (ufo.offsetWidth / 10) <= 0) {
            area.removeChild(ufo);
            scene.hitBy = 'Ufo passed behind you!'
            gameOverAction();
        }
        bangs.forEach(bang => {
            if (collision(bang, ufo)) {
                area.removeChild(ufo);
                area.removeChild(bang);
                scene.ufoKillsCount++;
                scene.score += scene.ufoKillScore;
            }
        });
    });
}
function chooseUfo() {
    let pics = new Array('../images/sci-fi-80.png',
    '../images/sci-fi-96.png');

    let randomNum = Math.floor(Math.random() * pics.length);
    image.src = pics[randomNum];
}