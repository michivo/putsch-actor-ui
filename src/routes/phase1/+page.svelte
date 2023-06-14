<script lang="ts">
  import { Button } from 'sveltestrap';
</script>

<div class="d-flex flex-column flex-fill">
  <Button class="btn btn-lg m-2" href="/all-players?phaseId=1">Quests Phase 1 - Spieler*innen</Button>
  <div class="flex-fill"></div>
  <Button class="btn btn-lg m-2 btn-warning" href="/">Startbildschirm</Button>
</div>

<style>
    em {
        font-weight: 900;
        font-style: normal;
    }
</style>