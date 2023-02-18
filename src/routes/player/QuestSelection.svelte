<script lang="ts">
	import type { Quest } from '../../types/quest';
	import { createEventDispatcher } from 'svelte';
	import { Button } from 'sveltestrap';
	import { selectQuest } from '../../services/eventhub';
    import { currentPlayer } from '../../stores/gamestore';

	const dispatch = createEventDispatcher();

	export let quests: Quest[];

	async function questSelected(questId: string) {
        await selectQuest($currentPlayer!.id, questId);
		dispatch('questSelected');
	}
</script>

<h3>Wähle einen Quest:</h3>
{#each quests as quest}
	<Button class="btn-lg w-100 m-2" on:click={async (e) => questSelected(quest.id)}>{quest.name} (id: {quest.id})</Button>
{/each}
