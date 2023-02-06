<script>
    import { onMount } from "svelte";
    import { getGameDetails } from "../services/adaptorex";
	import { gameData } from "../stores/gamestore";

    onMount(async () => {
        const game = await getGameDetails();
        gameData.set(game);
    });
</script>

{#if $gameData === null}
<h1>Loading</h1>
{:else}
<h1>Welcome to Game {$gameData.name}.</h1>
<ul>
    {#each $gameData.level as level}
        <a href="/triggers?game={$gameData.name}&level={level.name}">{level.name}</a>
    {/each}
</ul>
{/if}
