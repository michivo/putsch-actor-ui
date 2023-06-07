<script lang="ts">
  import { Button, Navbar, NavbarBrand } from 'sveltestrap';
</script>

<Navbar color="light"><NavbarBrand>Willkommen bei putsch</NavbarBrand></Navbar>
<div class="d-flex flex-column">
  <Button class="btn btn-lg m-2" href="/phase1">Phase 1</Button>
  <Button class="btn btn-lg m-2" href="/phase2">Phase 2</Button>
  <Button class="btn btn-lg m-2" href="/phase3">Phase 3</Button>
</div>
<hr>
<div class="d-flex flex-column">
  <Button class="btn btn-lg m-2" color="info" href="/volume-settings">Lautstärke Spieler*innen</Button>
  <Button class="btn btn-lg m-2" color="info" href="/volume-settings-radio">Lautstärke Radios</Button>
  <Button class="btn btn-lg m-2" color="info" href="/npc-select">NPC-Einstellungen</Button>
</div>