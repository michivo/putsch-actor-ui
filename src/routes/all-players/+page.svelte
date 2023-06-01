<script lang="ts">
  import { onMount } from 'svelte';
  import { Button, Navbar, NavbarBrand, Spinner } from 'sveltestrap';
  import { getPlayers } from '../../services/eventhub';
  import { currentPlayer } from '../../stores/gamestore';
  import type { Player } from '../../types/player';
  import { page } from '$app/stores';

  let players: Player[] = [];
  let loaded = false;
  let phaseId = '';

  onMount(async () => {
    phaseId = $page.url.searchParams.get('phaseId') ?? '';
    currentPlayer.set(null);
    players = await getPlayers();
    loaded = true;
  });

  function showPlayer(player: Player) {
    currentPlayer.set(player);
  }
</script>

<Navbar color="light"
  ><NavbarBrand>Wähle Spieler*in</NavbarBrand></Navbar>

{#if !loaded}
  <Spinner />
{:else}
  <div class="container d-flex flex-column flex-fill">
    <div>
      <div class="row">
        {#each players as player}
          <div class="col-4 col-md-4">
            <Button
              class="btn-lg btn-block m-2 w-100"
              color="info"
              on:click={() => showPlayer(player)}
              href="../player?playerId={player.id}&phaseId={phaseId}">{player.id}</Button
            >
          </div>
        {/each}
      </div>
    </div>
	<div class="flex-fill"></div>
    <Button class="btn btn-lg m-2 btn-warning" href="/phase{phaseId}">Phase {phaseId}</Button>
    <Button class="btn btn-lg m-2 btn-warning" href="/">Startbildschirm</Button>
  </div>
{/if}
