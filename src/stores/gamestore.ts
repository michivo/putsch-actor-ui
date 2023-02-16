import { writable, type Writable } from 'svelte/store';
import type { Game } from '../types/game';
import type { Player } from '../types/player';

export const currentPlayer: Writable<Player | null> = writable(null);

export const gameData: Writable<Game | null> = writable(null);

