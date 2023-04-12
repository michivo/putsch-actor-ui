<script lang="ts">
  import { Button } from 'sveltestrap';
  import { staircases, offices } from '../../types/observePositions';
  import { triggerEvent } from '../../services/eventhub';

  let positionType: string | undefined = undefined;

  function triggerPosition(position: string): void {
    triggerEvent('', position);
  }
</script>

<div class="row">
  {#if !positionType}
    <Button
      class="btn-lg btn-block m-1 w-100"
      color="primary"
      on:click={() => (positionType = 'staircases')}
      >Stiegenhaus
    </Button>
    <Button
      class="btn-lg btn-block m-1 w-100"
      color="primary"
      on:click={() => (positionType = 'offices')}
      >Büro
    </Button>
  {:else}
    <Button
      class="btn-lg btn-block m-1 w-100"
      color="primary"
      on:click={() => (positionType = undefined)}
      >Zurück
    </Button>
    {#each (positionType === 'offices' ? offices : staircases) as position}
      <div class="col-6 col-md-4">
        <Button
          class="btn-lg btn-block m-1 w-100"
          color="info"
          on:click={() => triggerPosition(position)}
          >{position}
        </Button>
      </div>
    {/each}
  {/if}
</div>
