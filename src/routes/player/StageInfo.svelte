<script lang="ts">
  import type { PlayerQuestStage } from '../../types/quest';
  import { currentPlayer } from '../../stores/gamestore';
  import { getActiveQuest, triggerEvent } from '../../services/eventhub';
  import { Alert, Button, Spinner } from 'sveltestrap';

  export let currentStage: PlayerQuestStage;
  let loading = false;

  async function onTrigger(triggerId: string): Promise<void> {
    loading = true;
    try {
      await triggerEvent($currentPlayer!.id, triggerId);
      await new Promise((r) => setTimeout(r, 500));
      const newStage = await getActiveQuest($currentPlayer!.id);
      if (newStage) {
        currentStage = newStage;
      }
    } finally {
      loading = false;
    }
  }
</script>

<h2>Stage {currentStage.name ?? ''} Trigger</h2>
{#if loading}
  <Spinner />
{:else if currentStage.stageIndex === -1}
  <Alert color="success">Quest {currentStage.name} abgeschlossen</Alert>
{:else}
  {#each currentStage.triggerIds as triggerId}
    <Button class="btn-lg w-100 m-2" color="info" on:click={async () => onTrigger(triggerId)}
      >{triggerId}</Button
    >
  {/each}
{/if}
