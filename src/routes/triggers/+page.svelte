<script lang="ts">
	import { trigger } from "../../services/adaptorex";
	import { locations } from "../../types/locations";
    
    const urlParams = new URLSearchParams(window.location.search);
    const game = urlParams.get('game') ?? 'unknown';
    const triggerLocations = locations;

    async function triggerLocation(location: string) {
        await trigger(game, location);
    }
</script>

<h1>Select a trigger</h1>
<ul>
    {#each triggerLocations as location}
        <button on:click={async () => await triggerLocation(location)}>{location}</button><br>
    {/each}
</ul>
