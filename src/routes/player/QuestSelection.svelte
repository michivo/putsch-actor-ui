<script lang="ts">
	import type { Quest } from '../../types/quest';
	import { createEventDispatcher } from 'svelte';
	import { Button, Spinner } from 'sveltestrap';
	import { getAllQuests, selectQuest } from '../../services/eventhub';
    import { currentPlayer } from '../../stores/gamestore';
    import { npc } from '../../stores/npcstore';

	const dispatch = createEventDispatcher();

	export let quests: Quest[];
	let showingAll = false;
	let loading = false;
	let filteredQuests: Quest[] = [];
	let npcName: string = '';

	$: questsForNpc = showingAll || !npc ? quests : quests.filter(q => showForNpc(q.npcs))

	async function questSelected(questId: string) {
        await selectQuest($currentPlayer!.id, questId);
		dispatch('questSelected');
	}

	npc.subscribe(val => npcName = val || '');

	function showForNpc(npcList: string) {
		if(!npcList) {
			return true;
		}

		const npcNames = npcList.split(',').map(x => x.trim()).filter(x => !!x);
		if(npcNames.length === 0) {
			return true;
		}

		return npcNames.includes(npcName);
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
{#each questsForNpc as quest}
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