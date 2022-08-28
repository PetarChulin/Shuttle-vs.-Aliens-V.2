import { scene , game , area, collision, shuttle} from "../main.js";
let image;
export function createStar(timestamp) {
    let starSize = 100;
    if (timestamp - scene.lastStarSpawn > game.starsInterval + 80000 * Math.random()) {
        let star = document.createElement('div');
        star.classList.add('star');
        image = document.createElement('img');
        star.x = area.offsetWidth - starSize;
        star.style.left = star.x + 'px';
        star.style.top = (area.offsetHeight - starSize) * Math.random() + 'px';

        star.appendChild(image);
        area.appendChild(star);
        scene.lastStarSpawn = timestamp;
        chooseStar();

    }
    let stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.x -= game.speed;
        star.style.left = star.x + 'px';

        if(collision(shuttle, star)) {
            scene.score += 50;
            star.parentElement.removeChild(star);
        }

        star.x + star.offsetWidth == 0 ? star.parentElement.removeChild(star) : null;
    });
} 
function chooseStar() {
    let pics = new Array('../images/star-96.png',
    '../images/star-100.png');

    let randomNum = Math.floor(Math.random() * pics.length);
    image.src = pics[randomNum];
}