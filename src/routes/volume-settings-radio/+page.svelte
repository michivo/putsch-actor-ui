<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { Button, FormGroup, Input, Label, Navbar, NavbarBrand, Spinner } from 'sveltestrap';
  import { getPlayers } from '../../services/eventhub';
  import type { Player } from '../../types/player';
  import type { AudioSettings } from '../../types/audioSettings';
  import { putschFirestore } from '../../tools/firebase';
  import { collection, getDocs, onSnapshot, type Unsubscribe } from 'firebase/firestore';
  import { updateVolume } from '../../services/audioSettings';

  let radioIds: string[] = [];
  let loaded = false;
  let selectedRadio: string | undefined = undefined;
  let audioSettings: AudioSettings[] = [];
  let firestoreUnsubscribe: Unsubscribe;
  $: radioSelected = !selectedRadio;
  $: loadVolumeForRadio(selectedRadio);
  $: updateVolumeForRadio(volume);
  let volume: number;

  onMount(async () => {
    for(let i = 1; i < 22; i++) {
      radioIds.push(`R${i}`);
    }

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

  function loadVolumeForRadio(radio: string | undefined) {
    if (radio) {
      const volumeSettings = audioSettings.find((s) => s.playerId === radio);
      if (volumeSettings) {
        volume = volumeSettings.volume;
      } else {
        volume = 50;
      }
    }
  }

  function updateVolumeForRadio(newVolume: number) {
    if (selectedRadio) {
      const volumeSettings = audioSettings.find((s) => s.playerId === selectedRadio);
      if (volumeSettings && volumeSettings.volume === newVolume) {
        return;
      }
      updateVolume({
        playerId: selectedRadio,
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

<Navbar color="light"><NavbarBrand>Wähle Radio</NavbarBrand></Navbar>

{#if !loaded}
  <Spinner />
{:else}
  <div class="container d-flex flex-column flex-fill">
    <div>
      <div class="row">
        <FormGroup>
          <Label for="radioSelect">Radio</Label>
          <Input type="select" required name="player" id="radioSelect" bind:value={selectedRadio}>
            {#each radioIds as radio}
              <option value={radio}>{radio}</option>
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
            bind:disabled={radioSelected}
            bind:value={volume}
          />
        </FormGroup>
        <div class="control-buttons">
          <Button style="flex: 1;" class="btn-lg" bind:disabled={radioSelected} on:click={() => changeVolume(-10)}>-10</Button>
          <Button style="flex: 1;" class="btn-lg" bind:disabled={radioSelected} on:click={() => changeVolume(-1)}>-1</Button>
          <Button style="flex: 1;" class="btn-lg" bind:disabled={radioSelected} on:click={() => changeVolume(1)}>+1</Button>
          <Button style="flex: 1;" class="btn-lg" bind:disabled={radioSelected} on:click={() => changeVolume(10)}>+10</Button>
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