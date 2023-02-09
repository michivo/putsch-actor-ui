<script lang="ts">
	import { onMount } from 'svelte';
	import { trigger } from '../../services/adaptorex';
	import { locations } from '../../types/locations';
	import { Button, Heading } from 'flowbite-svelte';

	let game = '';
	const triggerLocations = locations;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		game = urlParams.get('game') ?? 'unknown';
	});

	async function triggerLocation(location: string) {
		await trigger(game, location);
	}
</script>

<div class="p-8">
	<Heading customSize="text-3xl">Select a trigger</Heading>
	<ul>
		{#each triggerLocations as location}
			<Button on:click={async () => await triggerLocation(location)}>{location}</Button><br />
		{/each}
	</ul>
</div>
