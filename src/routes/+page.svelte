<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, derived } from 'svelte/store';
	import { browser } from '$app/environment';
	import ItemList from '$components/ItemList.svelte';
	import { Navbar, Select, P } from 'flowbite-svelte';

	interface Item {
		name: string;
		tags: string[];
	}
	let items = writable<Item[]>([]);

	let options = writable({
		columns: '3',
		searchQuery: ''
	});
	let mounted = false;

	onMount(async () => {
		if (browser) {
			// Load the options from the URL
			const params = new URLSearchParams(window.location.search);
			const searchQuery = params.get('search');
			const columns = params.get('columns');
			if (searchQuery) {
				options.update((o) => ({ ...o, searchQuery }));
			}
			if (columns) {
				options.update((o) => ({ ...o, columns }));
			}

			mounted = true;

			// Load the items from the API
			const res = await fetch('/api/items');
			const data = await res.json();
			items.set(data);
		}
	});

	if (browser) {
		options.subscribe((value) => {
			if (!mounted) {
				return;
			}

			// Update the URL with the current options
			const params = new URLSearchParams(window.location.search);
			if (value?.columns) {
				params.set('columns', value.columns);
			} else {
				params.delete('columns');
			}
			if (value?.searchQuery) {
				params.set('search', value.searchQuery);
			} else {
				params.delete('search');
			}

			let url = null;
			if (params.toString()) {
				url = `${window.location.pathname}?${params.toString()}`;
			} else {
				url = `${window.location.pathname}`;
			}
			window.history.pushState({}, '', url);
		});
	}

	const filteredItems = derived([items, options], ([$items, $options]) => {
		return $items.filter((item) => {
			if ($options.searchQuery) {
				return (
					item.name.includes($options.searchQuery) ||
					item.tags.some((t: any) => t.includes($options.searchQuery))
				);
			}
			return true;
		});
	});
</script>

<Navbar>
	<div class="flex flex-1">
		<P>
			<input type="text" bind:value={$options.searchQuery} placeholder="filter..." />
		</P>
		<div class="inline-block min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
		<P>
			<Select bind:value={$options.columns}>
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
