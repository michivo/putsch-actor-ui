<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Navbar,
    NavbarBrand,
    Spinner,
    Toast,
    ToastBody,
    ToastHeader,
  } from 'sveltestrap';
  import { getActiveQuest, getQuests, resetPlayer } from '../../services/eventhub';
  import { currentPlayer } from '../../stores/gamestore';
  import type { Quest, PlayerQuestStage } from '../../types/quest';
  import StageInfo from './StageInfo.svelte';
  import QuestSelection from './QuestSelection.svelte';

  let currentStage: PlayerQuestStage | undefined = undefined;
  let quests: Quest[] | undefined = undefined;
  let loading = false;
  let modalOpen = false;

  onMount(async () => {
    loading = true;
    if (!$currentPlayer) {
      return;
    }
    await loadData();
  });

  async function loadData() {
    try {
      currentStage = await getActiveQuest($currentPlayer!.id);
      console.log(currentStage);
    } finally {
      try {
        if (!currentStage || currentStage.stageIndex === -1) {
          quests = await getQuests();
        }
      } finally {
        loading = false;
      }
    }
  }

  async function onQuestSelected() {
    loading = true;
    await new Promise((r) => setTimeout(r, 500));
    await loadData();
    loading = false;
  }

  async function resetCurrentPlayer() {
    try {
      if ($currentPlayer) {
        await resetPlayer($currentPlayer.id);
        await loadData();
      }
    } finally {
      closeModal();
    }
  }

  const openModal = () => {
    modalOpen = true;
  };

  const closeModal = () => {
    modalOpen = false;
  };
</script>

{#if $currentPlayer}
  <Navbar color="light"
    ><NavbarBrand>Spieler*in {$currentPlayer.id}</NavbarBrand><Button
      class="btn-lg"
      color="warning"
      href="..">X</Button
    ></Navbar
  >
  {#if loading}
    <Spinner />
  {:else if currentStage}
    <StageInfo {currentStage} />
    <Button class="btn-lg w-100 m-2" color="warning" on:click={openModal}>Zurücksetzen</Button>
  {/if}
  {#if !loading && (!currentStage || currentStage.stageIndex === -1) && quests}
    <QuestSelection {quests} on:questSelected={onQuestSelected} />
  {/if}

  <Modal isOpen={modalOpen}>
    <ModalHeader>Zurücksetzen</ModalHeader>
    <ModalBody>
      Willst du Spieler*in {$currentPlayer.id} wirklich zurücksetzen?
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={resetCurrentPlayer}>Ja</Button>
      <Button color="secondary" on:click={closeModal}>Nein</Button>
    </ModalFooter>
  </Modal>
{:else}
  <div class="p-3 bg-danger mb-3">
    <Toast class="me-1">
      <ToastHeader>Kein*e Spieler*in ausgewählt</ToastHeader>
      <ToastBody>
        <a href="../players">Zurück zur Auswahl</a>
      </ToastBody>
    </Toast>
  </div>
{/if}
