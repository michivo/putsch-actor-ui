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

<Navbar color="secondary"><NavbarBrand>Willkommen bei putsch</NavbarBrand></Navbar>
{#if $gameData === null}
	<Spinner />
{:else}
	<ul>
		<Button href="/players">Spieler*innen</Button>
		<Button href="/players">Trigger</Button>
	</ul>
{/if}
