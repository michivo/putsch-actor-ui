<script lang="ts">
	import { onMount } from 'svelte';
	import { getGameDetails } from '../services/adaptorex';
	import { gameData } from '../stores/gamestore';
	import { Button, Navbar, NavbarBrand, Spinner } from 'sveltestrap';

	onMount(async () => {
		const game = await getGameDetails();
		gameData.set(game);
	});
</script>

<Navbar color="light"><NavbarBrand>Willkommen bei putsch</NavbarBrand></Navbar>
{#if $gameData === null}
	<Spinner />
{:else}
	<div class="d-flex flex-column">
		<Button class="btn btn-lg m-2" href="/phase1">Phase 1</Button>
		<Button class="btn btn-lg m-2" href="/phase2">Phase 2</Button>
		<Button class="btn btn-lg m-2" href="/phase3">Phase 3</Button>
		<!-- <Button class="btn btn-lg m-2" href="/players">Trigger</Button> -->
	</div>
{/if}
