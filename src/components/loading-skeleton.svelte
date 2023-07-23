<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div transition:fade class="bg-gray-200 animate-pulse rounded-lg p-8 my-5 relative">
	<div
		class="bg-gray-300 text-gray-200 rounded-full border-2 border-gray-200 w-12 h-12 flex items-center justify-center text-2xl font-bold absolute top-0 left-0 -mt-4 -ml-4"
	>
		...
	</div>
	<button
		type="button"
		class="absolute font-bold top-2 right-4 cursor-pointer bg-transparent border-none"
	>
		...
	</button>
	<p class="bg-gray-300 h-4 w-3/4 mt-5 rounded" />
</div>
