import { writable, type Writable } from 'svelte/store';
import type { Game } from '../types/game';

export const gameData: Writable<Game | null> = writable(null);

