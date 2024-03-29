import { writable, type Writable } from 'svelte/store';
import type { Player } from '../types/player';
import type { PlayerQuestStage, QuestStage } from '../types/quest';

export const currentPlayer: Writable<Player | null> = writable(null);

export const currentStage: Writable<QuestStage | null> = writable(null);

export const questData: Writable<PlayerQuestStage[] | null> = writable(null);