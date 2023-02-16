<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Navbar, NavbarBrand, Spinner } from 'sveltestrap';
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

<Navbar color="primary" dark><NavbarBrand>Wähle Spieler*in</NavbarBrand><Button color="warning" href="..">X</Button></Navbar>

{#if !loaded}
	<Spinner />
{:else}
	<ul>
		{#each players as player}
			<Button class="m-2" on:click={() => showPlayer(player)} href="../player"
				>{player.id}</Button
			>
		{/each}
	</ul>
{/if}
