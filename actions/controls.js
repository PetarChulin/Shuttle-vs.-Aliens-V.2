import {game , area, player, shuttle, shot} from '../main.js'

export let keys = {};

export function navigate(timestamp) {
    
    keys.ArrowUp && player.y > 0 ? player.y -= game.speed * 8 : null;
    keys.ArrowDown && player.y + player.height < area.offsetHeight ? player.y += game.speed * 8 : null;
    keys.ArrowLeft && player.x > 0 ? player.x -= game.speed * 8 : null;
    keys.ArrowRight && player.x + player.width < area.offsetWidth ? player.x += game.speed * 8 : null;


    if (keys.Space && timestamp - player.lastFired > game.fireInterval) {
        shuttle.classList.add('shuttle-fire');
        shot(player);
        player.lastFired = timestamp;
    } else {
        shuttle.classList.remove('shuttle-fire');
    }
}