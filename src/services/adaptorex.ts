import type { Game } from "../types/game";

async function getGameDetails(): Promise<Game> {
    const response = await fetch(
        'https://putsch-gce.faschinger.com:8443/api/game/demo',
        { method: 'GET' }
    );
    const data = await response.json() as Game;
    return data;
}

async function trigger(game: string, location: string): Promise<boolean> {
    const response = await fetch(
        `https://putsch-gce.faschinger.com:8443/${game}/devices/http_event_trigger?location=${location}`,
        { method: 'GET' }
    );
    
    return response.ok;
}

export { getGameDetails, trigger };