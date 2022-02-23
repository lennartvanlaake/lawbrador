<script lang="ts">
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  export let link: string;

</script>

<Dialog 
  open={true}
  aria-labelledby="simple-title"
  aria-describedby="simple-content"
>
  <Title id="simple-title">Could not parse document text</Title>
  <Content id="simple-content">View the original on the source site or go back?</Content>
  <Actions>
    <Button on:click={() => window.location.href = link}>
      <Label>To original</Label>
    </Button>
    <Button on:click={() => history.back()}>
      <Label>Back</Label>
    </Button>
  </Actions>
</Dialog>
