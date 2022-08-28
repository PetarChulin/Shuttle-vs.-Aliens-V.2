import { keys, navigate } from './actions/controls.js';
import { remove } from './actions/remove.js';
import { createBang } from './spaceObjects/bang.js';
import { createGray } from './spaceObjects/gray.js';
import { createPlanet, planet } from './spaceObjects/planet.js';
import { createSolar } from './spaceObjects/solar.js';
import { createStar } from './spaceObjects/star.js';
import { createUfo } from './spaceObjects/ufo.js';

export let area = document.querySelector('.game-area');
export let gameOver = document.querySelector('.game-over');
export let hitBy = document.querySelector('.hit-by');
let start = document.querySelector('.game-start');
let info = document.querySelector('.game-info');
let gamePoints = document.querySelector('.points');
let controls = document.querySelector('.controls');

start.addEventListener('click', onGameStart);
gameOver.addEventListener('click', onGameStart);

export let shuttle;

export let player = {
    x: 15,
    y: 300,
    width: 0,
    height: 0,
    lastFired: 0
};
export let game = {
    speed: 1,
    fireInterval: 500,
    starsInterval: 6000,
    ufosInterval: 1500,
    grayInterval: 10000,
    planetInterval: 20000,
    solarInterval: 30000
};

export let scene = {
    score: 500,
    lastUfoSpawn: 0,
    lastStarSpawn: 0,
    lastGraySpawn: 0,
    lastPlanetSpawn: 0,
    lastSolarSpawn: 0,
    activeGame: true,
    ufoKillScore: 100,
    ufoKillsCount: 0,
    grayKillsCount: 0,
    grayBlood: 5,
    hitBy: null
};
function onGameStart() {
    scene.activeGame = true;
    game.speed = 1;
    area.classList = 'game-area';
    shuttle = document.createElement('div');
    start.classList = 'hide';
    gameOver.classList = 'hide';
    controls.classList = 'hide';
    setTimeout(function () { info.classList = 'hide' }, 3000);
    scene.score = 500;
    scene.ufoKillsCount = 0;
    scene.grayKillsCount = 0;
    shuttle.classList = 'shuttle';
    shuttle.style.top = player.y + 'px';
    shuttle.style.left = player.x + 'px';
    area.appendChild(shuttle);


    player.width = shuttle.offsetWidth + 12;
    player.height = shuttle.offsetHeight + 12;

    if (shuttle.style.top >= area.offsetHeight - 10) {
        shuttle.style.top = area.offsetHeight - 100;
    }
    if (shuttle.style.left >= area.offsetWidth - 10) {
        shuttle.style.left = area.offsetWidth - 100;
    }

    setTimeout(function () { game.speed = 1.5; }, 15000);
    setTimeout(function () { game.speed = 2; }, 25000);
    setTimeout(function () { game.speed = 2.5; }, 35000);
    setTimeout(function () { game.speed = 3; }, 45000);


    window.requestAnimationFrame(action);

}

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(e) { keys[e.code] = true; }
function onKeyUp(e) { keys[e.code] = false; }

export function action(timestamp) {
    // hitBy.classList = 'hide';
    console.log(game.speed);
    console.log(timestamp)
    navigate(timestamp);

    createBang();
    createUfo(timestamp);
    createStar(timestamp);
    createPlanet(timestamp);
    createSolar(timestamp);
    createGray(timestamp);

    shuttle.style.top = player.y + 'px';
    shuttle.style.left = player.x + 'px';

    gamePoints.textContent = scene.score;

    scene.activeGame ? window.requestAnimationFrame(action) : null;

}
export function shot(player) {
    let bang = document.createElement('div');
    bang.classList.add('bang');
    bang.style.top = (player.y + player.height / 3) + 'px';
    bang.x = 7;
    bang.style.left = bang.x + 'px';
    area.appendChild(bang);
}

export function collision(first, second) {
    let firstRect = first.getBoundingClientRect();
    let secondRect = second.getBoundingClientRect();

    return !(firstRect.top > secondRect.bottom
        || firstRect.bottom < secondRect.top
        || firstRect.right < secondRect.left
        || firstRect.left > secondRect.right);
}

export function gameOverAction() {
    scene.score = 0;
    game.speed = 0;
    scene.grayBlood = 5;
    scene.activeGame = false;
    gameOver.classList.remove('hide');
    gameOver.className = 'game-over';
    gameOver.innerHTML = `${scene.hitBy}` + `<br>` + 
    `Game Over ;( Ufos killed: ${scene.ufoKillsCount}` + `<br>` + `Grays killed: ${scene.grayKillsCount}`;

    setTimeout(function () { gameOver.textContent = 'Play again ?', gameOver.style = 'background-color: rgb(255, 165, 0)' }, 4000);

    player.x = 15;
    player.y = 300;

    area.removeChild(shuttle);

    let ufos = document.querySelectorAll('.ufo');
    let grays = document.querySelectorAll('.gray');
    let planets = document.querySelectorAll('.planet');
    let solars = document.querySelectorAll('.solar');
    let stars = document.querySelectorAll('.star');
    let bangs = document.querySelectorAll('.bang');

    remove(ufos);
    remove(grays);
    remove(planets);
    remove(solars);
    remove(stars);
    remove(bangs);


}

