<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Button,
    Spinner,
    Toast,
    ToastBody,
    ToastHeader,
  } from 'sveltestrap';
  import { getActiveQuest, getPlayers, getQuests, resetPlayer } from '../../services/eventhub';
  import { currentPlayer } from '../../stores/gamestore';
  import type { Quest, PlayerQuestStage } from '../../types/quest';
  import StageInfo from './StageInfo.svelte';
  import QuestSelection from './QuestSelection.svelte';
  import { page } from '$app/stores';

  let currentStage: PlayerQuestStage | undefined = undefined;
  let quests: Quest[] | undefined = undefined;
  let loading = false;
  let phaseId = '';
  let forceQuestSelection = false;
  $: showStageInfo = currentStage && currentStage.stageIndex !== -1 && !forceQuestSelection;

  onMount(async () => {
    phaseId = $page.url.searchParams.get('phaseId') ?? '';
    loading = true;
    if (!$currentPlayer) {
      const playerId = $page.url.searchParams.get('playerId');
      if (playerId) {
        const allPlayers = await getPlayers();
        const player = allPlayers.find((p) => p.id == playerId);
        currentPlayer.set(player || null);
      }
      if (!$currentPlayer) {
        return;
      }
    }
    await loadData();
  });

  async function loadData() {
    try {
      currentStage = await getActiveQuest($currentPlayer!.id);
    } finally {
      try {
        if (!currentStage || currentStage.stageIndex === -1) {
          quests = await getQuests($currentPlayer!.id, phaseId);
        }
      } finally {
        loading = false;
      }
    }
  }

  async function onQuestSelected() {
    loading = true;
    forceQuestSelection = false;
    await new Promise((r) => setTimeout(r, 500));
    await loadData();
    loading = false;
  }

  async function onForceQuestSelection() {
    forceQuestSelection = true;
    loading = true;
    try {
      quests = await getQuests($currentPlayer!.id, phaseId);
    }
    finally {
      loading = false;
    }
  }
</script>

<div>
  {#if $currentPlayer}
    <div class="topbar">
      <span class="player-name">Spieler*in {$currentPlayer.id}</span>
      <Button class="btn-lg btn-close" aria-label="Close" href="/all-players?phaseId={phaseId}" />
    </div>
    {#if loading}
      <Spinner />
    {:else if showStageInfo && currentStage}
      <StageInfo {currentStage} />
    {/if}
    {#if !loading && !showStageInfo && quests}
      <QuestSelection {quests} on:questSelected={onQuestSelected} />
    {/if}
    {#if showStageInfo}
    <Button class="w-100 btn btn-lg m-2 btn-warning" on:click={onForceQuestSelection}>Questauswahl</Button>
    {/if}
    <Button class="w-100 btn btn-lg m-2 btn-warning" href="/all-players?phaseId={phaseId}">Spieler*innenauswahl</Button>
    <Button class="w-100 btn btn-lg m-2 btn-warning" href="/phase{phaseId}">Phase {phaseId}</Button>
    <Button class="w-100 btn btn-lg m-2 btn-warning" href="/">Startbildschirm</Button>
  {:else}
    <div class="p-3 bg-danger mb-3">
      <Toast class="me-1">
        <ToastHeader>Kein*e Spieler*in ausgewählt</ToastHeader>
        <ToastBody>
          <a href="/all-players?phaseId={phaseId}">Zurück zur Auswahl</a>
        </ToastBody>
      </Toast>
    </div>
  {/if}
</div>

<style>
  .topbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border: 2px solid #aaa;
    font-size: 1.5rem;
    padding: 0.25rem;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    background-color: #eee;
  }
</style>
