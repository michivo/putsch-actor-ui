<script lang="ts">
  import { Button, Navbar, NavbarBrand } from 'sveltestrap';
  import { staircases, offices } from '../../types/observePositions';
  import { triggerEvent } from '../../services/eventhub';

  let positionType: string | undefined = undefined;

  function triggerPosition(position: string): void {
    triggerEvent('', position);
  }
</script>

<div class="row">
  {#if !positionType}
    <Navbar color="light"
      ><NavbarBrand>Wähle BePo-Kategorie</NavbarBrand><Button
        class="btn-lg"
        color="warning"
        href="/phase1">X</Button
      ></Navbar
    >
    <Button
      class="btn-lg btn-block m-1 w-100"
      color="secondary"
      on:click={() => (positionType = 'staircases')}
      >Stiegenhaus
    </Button>
    <Button
      class="btn-lg btn-block m-1 w-100"
      color="secondary"
      on:click={() => (positionType = 'offices')}
      >Büro
    </Button>
  {:else}
    <Navbar color="light"
      ><NavbarBrand>Wähle BePo</NavbarBrand><Button
        class="btn-lg"
        color="warning"
        on:click={() => (positionType = undefined)}>X</Button
      ></Navbar
    >
    {#each positionType === 'offices' ? offices : staircases as position}
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
