import {game , area, shuttle, player} from "../main.js";


export function createBang() {
    let bangs = document.querySelectorAll('.bang');
    bangs.forEach(bang => {
        bang.x += game.speed * 10;
        bang.style.left = player.x + shuttle.offsetWidth + bang.x + 'px';
        bang.style.right = player.x + shuttle.offsetWidth + bang.x + 'px';

        bang.x + bang.offsetWidth > area.offsetWidth - (player.x + player.width) ? area.removeChild(bang) : null;
    });
}