<script>
	import { currentPlayer } from "../../stores/gamestore";
</script>

{#if $currentPlayer}
{ $currentPlayer.id }
{/if}