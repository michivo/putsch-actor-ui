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

<div class="container mx-auto">
	{#if $gameData === null}
		<Heading customSize="text-2xl">Loading</Heading>
        <Spinner></Spinner>
	{:else}
		<Heading customSize="text-2xl">Willkommen beim Spiel <em>{$gameData.name}</em></Heading>
		<ul>
			{#each $gameData.level as level}
				<Button href="/triggers?game={$gameData.name}&level={level.name}">{level.name}</Button>
			{/each}
		</ul>
	{/if}
</div>
