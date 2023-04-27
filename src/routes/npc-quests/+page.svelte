<script lang="ts">
  import { Button } from 'sveltestrap';
  import { questData } from '../../stores/gamestore';
  import { npc } from '../../stores/npcstore';
  import type { PlayerQuestStage } from '../../types/quest';
  import { triggerEvent } from '../../services/eventhub';

  let allQuests: PlayerQuestStage[] = [];
  let relevantQuests: PlayerQuestStage[] = [];
  let npcName: string = '';
  let dirtyQuests: PlayerQuestStage[] = [];

  function updateQuestInfo() {
    if (!npcName) {
      relevantQuests = [];
    } else {
      const oldCount = relevantQuests.length;
      relevantQuests = allQuests.filter((q) => q.npcName === npcName);
      const newCount = relevantQuests.length;
      if (newCount > oldCount) {
        try {
          navigator.vibrate([100, 30, 100]);
        } catch {}
      }
    }
  }

  npc.subscribe((value) => {
    npcName = value ?? '';
    updateQuestInfo();
  });

  questData.subscribe((questData) => {
    allQuests = questData ?? [];
    updateQuestInfo();
    dirtyQuests = [];
    console.log(relevantQuests);
  });

  function formatTriggerIds(values: string[] | undefined) {
    if (!values) {
      return '';
    }
    return values.join(', ');
  }

  function triggerPosition(playerData: PlayerQuestStage): void {
    const triggerId = playerData.triggerIds?.length > 0 ? playerData.triggerIds[0] : '';
    triggerEvent(playerData.playerId, triggerId);
    dirtyQuests.push(playerData);
  }
</script>

<div>
  <h2>Folgende Quests warten auf {npcName}:</h2>
  {#each relevantQuests as quest}
    <Button
      class="btn-lg btn-block m-1 w-100"
      color="info"
      disabled={dirtyQuests.includes(quest)}
      on:click={() => triggerPosition(quest)}
      >Quest {quest.questId} - Spieler*in {quest.playerId} - Trigger {formatTriggerIds(
        quest.triggerIds
      )}
    </Button>
  {/each}
</div>

<style>
  h2 {
    font-size: 1.5rem;
    padding-top: 0.8rem;
    padding-bottom: 0.5rem;
  }
</style>
