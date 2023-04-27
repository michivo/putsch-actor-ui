<script lang="ts">
  import { putschFirestore } from '../tools/firebase';
  import { collection, getDocs, onSnapshot, type Unsubscribe } from 'firebase/firestore';
  import { onMount, onDestroy } from 'svelte';
  import { npc } from '../stores/npcstore';
  import type { PlayerQuestStage } from '../types/quest';
  import { questData } from '../stores/gamestore';
  import { Badge } from 'sveltestrap';

  let npcName = '';
  let firestoreUnsubscribe: Unsubscribe;
  let relevantQuests: PlayerQuestStage[] = [];
  let allQuests: PlayerQuestStage[] = [];

  onMount(async () => {
    questData.subscribe((d) => {
      allQuests = d ?? [];
      updateQuestInfo();
    });

    const querySnapshot = await getDocs(collection(putschFirestore, 'playerQuests'));
    const initialData: PlayerQuestStage[] = [];
    querySnapshot.forEach((doc) => {
      const playerData = doc.data() as PlayerQuestStage;
      initialData.push(playerData);
    });
    questData.set(initialData);

    firestoreUnsubscribe = onSnapshot(collection(putschFirestore, 'playerQuests'), (data) => {
      const updatedData: PlayerQuestStage[] = [];
      data.docs.forEach((doc) => {
        const sensorEvent = doc.data() as PlayerQuestStage;
        updatedData.push(sensorEvent);
      });
      updatedData.sort((a, b) => a.questId.localeCompare(b.questId));
      questData.set(updatedData);
    });
  });

  onDestroy(() => {
    if (firestoreUnsubscribe) {
      firestoreUnsubscribe();
    }
  });

  function updateQuestInfo() {
    if (!npcName) {
      relevantQuests = [];
    } else {
      relevantQuests = allQuests.filter((q) => q.npcName === npcName);
    }
  }

  npc.subscribe((value) => {
    npcName = value ?? '';
    updateQuestInfo();
  });
</script>

<div class="container mx-auto">
  <header>
    <span>putsch</span>
    {#if !!npcName}
      <a class="npc-name"
        href="npc-quests"
        >{npcName}
        <Badge pill color="info" style="font-family: sans-serif; font-size: 1rem;">{ relevantQuests.length }</Badge>
      </a>
    {/if}
    <span><a href="/">🏠</a></span>
  </header>
  <slot />
</div>

<style>
  @font-face {
    font-family: 'OrbitronBlack';
    font-weight: 900;
    src: url('/fonts/orbitron-black.ttf');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'OrbitronMedium';
    font-weight: 400;
    src: url('/fonts/orbitron-medium.ttf');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
      U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  header {
    display: flex;
    justify-content: space-between;
    font-family: 'OrbitronBlack';
    font-weight: 900;
    font-size: 22pt;
    background-color: black;
    color: white;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
  }

  a.npc-name {
    font-family: 'OrbitronMedium';
    font-weight: 400;
    background-color: #555;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid white;
    color:white;
    text-decoration: underline;
  }

  header a {
    text-decoration: none;
  }
</style>
