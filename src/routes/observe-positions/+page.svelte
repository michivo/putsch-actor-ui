<script lang="ts">
  import { Button } from 'sveltestrap';
  import { observePositions } from '../../types/observePositions';
    import { triggerEvent } from '../../services/eventhub';

  function triggerPosition(position: string): void {
    triggerEvent('', position);
  }
</script>

<div class="row">
  {#each observePositions as position}
    <div class="col-6 col-md-4">
      <Button
        class="btn-lg btn-block m-1 w-100"
        color="info"
        on:click={() => triggerPosition(position)}
        >{position}
      </Button>
    </div>
  {/each}
</div>
