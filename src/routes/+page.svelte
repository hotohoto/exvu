<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import { writable, derived } from 'svelte/store';
    import ItemList from '../components/ItemList.svelte';
    import { Navbar, Select, Card, P  } from 'flowbite-svelte';

    interface Item {
      name: string;
      tags: string[];
    }
    let items = writable<Item[]>([]);

    let pinnedItems = writable(new Set());
    let columns = writable(3);
    let searchQuery = writable('');

    onMount(async () => {
      const res = await fetch('/api/items');
      const data = await res.json();
      items.set(data);
    });

    // function togglePin(itemName: string) {
    //   if (pinnedItems.has(itemName)) {
    //     pinnedItems.delete(itemName);
    //   } else {
    //     pinnedItems.add(itemName);
    //   }
    // }

    const filteredItems = derived(
      [items, searchQuery],
      ([$items, $searchQuery]) => {
        return $items.filter(f =>
          f.name.includes($searchQuery) || f.tags.some((t: any) => t.includes($searchQuery))
        );
      }
    );
    console.log("columns", $columns)
    console.log("filteredItems", $filteredItems)
  </script>

<Navbar>
  <div class="flex flex-1">
    <P>
      <input type="text" bind:value={$searchQuery} placeholder="filter..." />
    </P>
    <div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10" ></div>
    <P>
      <Select bind:value={$columns}>
        <option value="1">1 column</option>
        <option value="2">2 columns</option>
        <option value="3">3 columns</option>
        <option value="4">4 columns</option>
      </Select>
    </P>
  </div>
</Navbar>
<P>
<ItemList items={$filteredItems} />
</P>
