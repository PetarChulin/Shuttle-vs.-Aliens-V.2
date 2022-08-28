import { scene, game, area, collision, shuttle, gameOverAction} from "../main.js";

let image;
export let planet;
export function createPlanet(timestamp) {
    let planetSize = 100;
    if (timestamp - scene.lastPlanetSpawn > game.planetInterval + 80000 * Math.random()) {
        planet = document.createElement('div');
        planet.classList.add('planet');
        image = document.createElement('img');
        planet.x = area.offsetWidth - planetSize;
        planet.style.left = planet.x + 'px';
        planet.style.top = (area.offsetHeight - planetSize) * Math.random() + 'px';

        planet.appendChild(image);
        area.appendChild(planet);
        scene.lastPlanetSpawn = timestamp;
        choosePlanet();

    }
    let planets = document.querySelectorAll('.planet');
    planets.forEach(planet => {
        planet.x -= game.speed;
        planet.style.left = planet.x + 'px';

        if (collision(shuttle, planet)) {
            scene.hitBy = 'You were hit by a planet!';
            gameOverAction();
        }
        planet.x + planet.offsetWidth / 10 == 0 ? planet.parentElement.removeChild(planet) : null;

    });
}

function choosePlanet() {
    let pics = new Array('../images/icons8-planet-96.png',
        '../images/icons8-saturn-64.png',
        '../images/icons8-neptune-64.png',
        '../images/icons8-planet-80.png',
        '../images/icons8-saturn-planet-96.png');

    let randomNum = Math.floor(Math.random() * pics.length);
    image.src = pics[randomNum];
}