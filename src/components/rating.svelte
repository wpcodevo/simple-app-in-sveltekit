<script lang="ts">
	export let selected: number = 0;
	export let onchange: (selected: number) => void = () => {};

	const handleChange = (value: number) => {
		selected = value;
		onchange(selected);
	};
</script>

<ul
	class="list-none grid grid-cols-5 sm:grid-cols-10 gap-y-2 sm:grid-rows-1 place-items-center sm:gap-0 sm:justify-around sm:my-7 my-4"
>
	{#each Array.from({ length: 10 }, (_, i) => i + 1) as i}
		<li
			class="relative sm:w-14 sm:h-14 w-10 h-10 p-3 text-center rounded-full border-gray-300 border-2 transition duration-300 {selected ===
			i
				? 'bg-pink-500 text-white'
				: 'bg-gray-200'}"
		>
			<input
				type="radio"
				class="opacity-0"
				id={`feedback-rating-radio-button-${i}`}
				name="rating"
				value={i}
				bind:group={selected}
				on:change={() => handleChange(i)}
			/>
			<label
				for={`feedback-rating-radio-button-${i}`}
				class="absolute text-sm sm:text-base w-full h-full flex items-center justify-center rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-pink-500 hover:text-white transition duration-300"
			>
				{i}
			</label>
		</li>
	{/each}
</ul>
