<script lang="ts">
	import type { Quest } from '../../types/quest';
	import { createEventDispatcher } from 'svelte';
	import { Button, Spinner } from 'sveltestrap';
	import { getAllQuests, selectQuest } from '../../services/eventhub';
    import { currentPlayer } from '../../stores/gamestore';

	const dispatch = createEventDispatcher();

	export let quests: Quest[];
	let showingAll = false;
	let loading = false;
	let filteredQuests: Quest[] = [];

	async function questSelected(questId: string) {
        await selectQuest($currentPlayer!.id, questId);
		dispatch('questSelected');
	}

	async function showAll() {
		if(showingAll) {
			quests = filteredQuests;
		}
		else {
			filteredQuests = quests;
			loading = true;
			try {
				const allQuests = await getAllQuests();
				if(allQuests) {
					quests = allQuests;
				}
			}
			finally {
				loading = false;
			}
		}
		showingAll = !showingAll;
	}
</script>

<div class="header">
  <h3>Wähle einen Quest:</h3>
  {#if loading}
    <Spinner />
  {:else}
    <Button color="primary" on:click={async (e) => showAll()}>Zeige {showingAll ? 'nur verfügbare' : 'alle'}</Button>
  {/if}
</div>
{#each quests as quest}
  <Button class="btn-lg w-100 m-2" on:click={async (e) => questSelected(quest.id)}
    >{quest.name} (id: {quest.id})</Button
  >
{/each}

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}
</style>