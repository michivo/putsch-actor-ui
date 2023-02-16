<script lang="ts">
	import { onMount } from 'svelte';
	import { getGameDetails } from '../services/adaptorex';
	import { gameData } from '../stores/gamestore';
	import { Button, Spinner, Heading } from 'flowbite-svelte';

	onMount(async () => {
		const game = await getGameDetails();
		gameData.set(game);
	});
</script>

{#if $gameData === null}
	<Spinner />
{:else}
	<Heading customSize="text-2xl">Willkommen beim Spiel <em>{$gameData.name}</em></Heading>
	<ul>
		<Button href="/players">Spieler*innen</Button>
		<Button href="/players">Trigger</Button>
	</ul>
{/if}
