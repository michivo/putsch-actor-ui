<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Navbar } from 'sveltestrap';
	import { trigger } from '../../services/adaptorex';
	import { locations } from '../../types/locations';

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

<Navbar class="mb-4">Wähle einen Trigger</Navbar>
<ul>
	{#each triggerLocations as location}
		<Button class="mb-2 w-full max-w-sm" on:click={async () => await triggerLocation(location)}>{location}</Button><br />
	{/each}
</ul>
