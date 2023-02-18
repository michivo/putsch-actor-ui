import { writable, type Writable } from 'svelte/store';
import type { Game } from '../types/game';
import type { Player } from '../types/player';
import type { QuestStage } from '../types/quest';

export const currentPlayer: Writable<Player | null> = writable(null);

export const gameData: Writable<Game | null> = writable(null);

export const currentStage: Writable<QuestStage | null> = writable(null);