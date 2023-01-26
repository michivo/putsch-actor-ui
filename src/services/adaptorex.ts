import type { Game } from "../types/game";

async function getGameDetails(): Promise<Game> {
    const response = await fetch(
        'https://putsch-gce.faschinger.com:8443/api/game/test',
        { method: 'GET' }
    );
    const data = await response.json() as Game;
    return data;
}

export { getGameDetails };