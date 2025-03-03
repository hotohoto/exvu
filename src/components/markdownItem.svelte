<script lang="ts">
  import { Heading, Gallery } from 'flowbite-svelte';
  import type { Item } from '$types';

  export let item: Item;
  $: name_and_tags = [item.name, ...item.tags].join(", ");
  $: images = item.images.map((img: string) => {
    return {
      src: img,
      alt: item.name,
    };
  });

</script>

<Heading tag="h2" customSize="text-4xl" >{name_and_tags}</Heading>
<Gallery items={images} class="gap-4 grid-cols-4" />
