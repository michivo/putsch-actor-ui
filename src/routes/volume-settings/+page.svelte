<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Button, FormGroup, Input, Label, Navbar, NavbarBrand, Spinner } from 'sveltestrap';
  import { getPlayers } from '../../services/eventhub';
  import type { Player } from '../../types/player';
  import type { AudioSettings } from '../../types/audioSettings';
  import { putschFirestore } from '../../tools/firebase';
  import { collection, getDocs, onSnapshot, type Unsubscribe } from 'firebase/firestore';
  import { updateVolume } from '../../services/audioSettings';

  let players: Player[] = [];
  let loaded = false;
  let selectedPlayer: Player | undefined = undefined;
  let audioSettings: AudioSettings[] = [];
  let firestoreUnsubscribe: Unsubscribe;
  $: playerSelected = !selectedPlayer;
  $: loadVolumeForPlayer(selectedPlayer);
  $: updateVolumeForPlayer(volume);
  let volume: number;

  onMount(async () => {
    players = await getPlayers();

    const querySnapshot = await getDocs(collection(putschFirestore, 'audioSettings'));
    const initialData: AudioSettings[] = [];
    querySnapshot.forEach((doc) => {
      const playerData = doc.data() as AudioSettings;
      initialData.push(playerData);
    });
    audioSettings = initialData;

    firestoreUnsubscribe = onSnapshot(collection(putschFirestore, 'audioSettings'), (data) => {
      const updatedData: AudioSettings[] = [];
      data.docs.forEach((doc) => {
        const sensorEvent = doc.data() as AudioSettings;
        updatedData.push(sensorEvent);
      });
      audioSettings = updatedData;
    });
    loaded = true;
  });

  onDestroy(() => {
    if (firestoreUnsubscribe) {
      firestoreUnsubscribe();
    }
  });

  function loadVolumeForPlayer(player: Player | undefined) {
    if (player) {
      const volumeSettings = audioSettings.find((s) => s.playerId === player.id);
      if (volumeSettings) {
        volume = volumeSettings.volume;
      } else {
        volume = 50;
      }
    }
  }

  function updateVolumeForPlayer(newVolume: number) {
    if (selectedPlayer) {
      const volumeSettings = audioSettings.find((s) => s.playerId === selectedPlayer!.id);
      if (volumeSettings && volumeSettings.volume === newVolume) {
        return;
      }
      updateVolume({
        playerId: selectedPlayer.id,
        volume,
      });
    }
  }

  function changeVolume(delta: number) {
    let newValue = volume + delta;
    if(newValue > 100) {
        newValue = 100;
    }
    if(newValue < 0) {
        newValue = 0;
    }
    volume = newValue;
  }
</script>

<Navbar color="light"><NavbarBrand>Wähle Spieler*in</NavbarBrand></Navbar>

{#if !loaded}
  <Spinner />
{:else}
  <div class="container d-flex flex-column flex-fill">
    <div>
      <div class="row">
        <FormGroup>
          <Label for="playerSelect">Spieler*in</Label>
          <Input type="select" required name="player" id="playerSelect" bind:value={selectedPlayer}>
            {#each players as player}
              <option value={player}>{player.id}</option>
            {/each}
          </Input>
        </FormGroup>
      </div>
      <div class="row">
        <FormGroup>
          <Label for="currentVolume">Lautstärke</Label>
          <Input
            type="number"
            name="currentVolume"
            id="currentVolume"
            placeholder="Lautstärke"
            bind:disabled={playerSelected}
            bind:value={volume}
          />
        </FormGroup>
        <div class="control-buttons">
          <Button style="flex: 1;" class="btn-lg" bind:disabled={playerSelected} on:click={() => changeVolume(-10)}>-10</Button>
          <Button style="flex: 1;" class="btn-lg" bind:disabled={playerSelected} on:click={() => changeVolume(-1)}>-1</Button>
          <Button style="flex: 1;" class="btn-lg" bind:disabled={playerSelected} on:click={() => changeVolume(1)}>+1</Button>
          <Button style="flex: 1;" class="btn-lg" bind:disabled={playerSelected} on:click={() => changeVolume(10)}>+10</Button>
        </div>
      </div>
    </div>
    <div class="flex-fill" />
    <Button class="btn btn-lg m-2 btn-warning" href="/">Startbildschirm</Button>
  </div>
{/if}

<style>
    .control-buttons {
        display: flex;
        flex-direction: row;
        gap: 1rem;
    }
</style>