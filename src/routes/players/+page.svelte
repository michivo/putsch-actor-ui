<script lang="ts">
	import { Button, Heading, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { getPlayers } from '../../services/eventhub';
	import { currentPlayer } from '../../stores/gamestore';
	import type { Player } from '../../types/player';

	let players: Player[] = [];
	let loaded = false;

	onMount(async () => {
        currentPlayer.set(null);
		players = await getPlayers();
		loaded = true;
	});

    function showPlayer(player: Player) {
        currentPlayer.set(player);
        
    }
</script>

<div class="flex flex-row pt-2">
	<Heading class="mb-4" customSize="text-3xl">Wähle Spieler*in</Heading>
	<Button class="bg-red-700 text-xl" href="..">X</Button>
</div>
{#if !loaded}
	<Spinner />
{:else}
	<ul>
		{#each players as player}
			<Button class="m-2 w-24 text-xl" on:click={() => showPlayer(player)} href="../player">{player.id}</Button>
		{/each}
	</ul>
{/if}
