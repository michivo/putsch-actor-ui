<script lang="ts">
    import { Button, Form, FormGroup, Input, Label } from "sveltestrap";
    import { npc } from "../../stores/npcstore";

    let npcName: string | null = '';

    $: npcName, updatePlayerName();
    $: isNameValid = npcName && npcName.match(/^NPC[1,2]?\d$/);

    npc.subscribe(value => {
      if(npcName !== value) {
        npcName = value;
      }
    })

    const updatePlayerName = () => {
      npc.set(npcName?.toLocaleUpperCase() ?? '');
    }

</script>
<Form>
    <FormGroup>
      <Label for="npcId" style="font-size: 1.5rem">Welcher NPC bist du?</Label>
      <div class:invalid={!isNameValid}>
        <Input id="npcId" class="input-lg" style="border: 1px solid #ccc; font-size: 1.5rem" plaintext bind:value={npcName} />
      </div>
    </FormGroup>
    <Button href=".." class="w-100 btn btn-lg">OK</Button>
</Form>

<style>
  .invalid {
    background-color: #ff8888;
  }
</style>