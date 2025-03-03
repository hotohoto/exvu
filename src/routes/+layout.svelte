<script lang="ts">
	import '$/app.css';
	let { children } = $props();
</script>

<div class="flex px-4 mx-auto w-full">
	<main class="lg:ml-72 w-full mx-auto">
		{@render children()}
	</main>
</div>
