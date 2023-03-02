import type { Player } from '../types/player';
import type { PlayerQuestStage, Quest } from '../types/quest';

async function getPlayers(): Promise<Player[]> {
  const response = await fetch(
    'https://putsch-event-hub.uc.r.appspot.com/api/v1/game-data/players',
    { method: 'GET' }
  );
  const data = (await response.json()) as Player[];
  return data;
}

async function getActiveQuest(playerId: string): Promise<PlayerQuestStage | undefined> {
  const response = await fetch(
    `https://putsch-event-hub.uc.r.appspot.com/api/v1/events/stage?playerId=${playerId}`,
    { method: 'GET' }
  );
  if(response.status >= 400) {
    console.log(`Error getting active quest for ${playerId}: ${response.statusText}`);
    return undefined;
  }
  const data = (await response.json()) as PlayerQuestStage | undefined;
  return data;
}

async function getQuests() {
  const response = await fetch(
    `https://putsch-event-hub.uc.r.appspot.com/api/v1/game-data/quests?getAll=true`,
    { method: 'GET' }
  );
  const data = (await response.json()) as Quest[] | undefined;
  return data;
}

async function selectQuest(playerId: string, questId: string): Promise<void> {
  const requestBody = { playerId, questId };
  await fetch('https://putsch-event-hub.uc.r.appspot.com/api/v1/events/quests/startRequests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
}

async function triggerEvent(playerId: string, sensorId: string): Promise<void> {
  const requestBody = { playerId, sensorId, value: 'dummy' };
  await fetch('https://putsch-event-hub.uc.r.appspot.com/api/v1/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
}

async function resetPlayer(playerId: string): Promise<void> {
  const requestBody = { playerId };
  await fetch('https://putsch-event-hub.uc.r.appspot.com/api/v1/events/players/resetRequests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
}

export { getPlayers, getActiveQuest, getQuests, selectQuest, resetPlayer, triggerEvent };
