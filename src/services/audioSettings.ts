import type { AudioSettings } from '../types/audioSettings';

async function updateVolume(audioSettings: AudioSettings): Promise<void> {
  await fetch('https://putsch-event-hub.uc.r.appspot.com/api/v1/audio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(audioSettings),
  });
}

async function getVolume(playerId: string): Promise<AudioSettings> {
  const response = await fetch(`https://putsch-event-hub.uc.r.appspot.com/api/v1/audio?playerId=${playerId}`, {
    method: 'GET', headers: {
      'Cache-Control': 'no-cache' } 
  });

  const data = (await response.json()) as AudioSettings;
  return data;
}

export { updateVolume, getVolume };
