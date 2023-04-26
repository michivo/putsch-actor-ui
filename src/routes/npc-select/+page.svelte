<script lang="ts">
    import { Button, Form, FormGroup, Input, Label, Navbar, NavbarBrand } from "sveltestrap";
    import { npc } from "../../stores/npcstore";

</script>
<Form>
    <FormGroup>
      <Label for="npcId" style="font-size: 1.5rem">Welcher NPC bist du?</Label>
      <Input class="input-lg" style="border: 1px solid #ccc; font-size: 1.5rem" plaintext bind:value={$npc} />
    </FormGroup>
    <Button href=".." class="w-100 btn btn-lg">OK</Button>
</Form>

<style>

</style>