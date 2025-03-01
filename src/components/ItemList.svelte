<script lang="ts">
  import Item from './Item.svelte';

  export let items: any[] = [];

</script>


{#each items.slice(0, 10) as item (item.name)}
  <div>
    <Item {item}/>
  </div>
{/each}

