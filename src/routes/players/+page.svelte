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

<Navbar color="light"
	><NavbarBrand>Wähle Spieler*in</NavbarBrand><Button class="btn-lg" color="warning" href="..">X</Button></Navbar
>

{#if !loaded}
	<Spinner />
{:else}
	<div class="container">
		<div class="row">
			{#each players as player}
				<div class="col-4 col-md-4">
					<Button
						class="btn-lg btn-block m-2 w-100"
						color="info"
						on:click={() => showPlayer(player)}
						href="../player">{player.id}</Button
					>
				</div>
			{/each}
		</div>
	</div>
{/if}
