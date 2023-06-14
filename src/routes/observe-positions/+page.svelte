<script lang="ts">
  import { Button, Navbar, NavbarBrand } from 'sveltestrap';
  import { staircases, offices } from '../../types/observePositions';
  import { triggerEvent } from '../../services/eventhub';

  let positionType: string | undefined = undefined;

  function triggerPosition(position: string): void {
    triggerEvent('', position);
  }
</script>

<div class="row d-flex flex-column flex-fill">
  {#if !positionType}
    <Navbar color="light"
      ><NavbarBrand>Wähle BePo-Kategorie</NavbarBrand></Navbar
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
    <div class="flex-fill" />
    <Button class="btn btn-lg m-2 btn-warning" href="/">Startbildschirm</Button>
  {:else}
    <Navbar color="light"
      ><NavbarBrand>Wähle BePo</NavbarBrand></Navbar>
    <div class="row">
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
    </div>
    <Button class="btn btn-lg m-2 btn-warning" on:click={() => positionType = ''}>BePo-Kategorien</Button>
    <Button class="btn btn-lg m-2 btn-warning" href="/">Startbildschirm</Button>
  {/if}
</div>
