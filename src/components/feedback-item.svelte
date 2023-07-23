<script lang="ts">
	import type { Feedback } from '@prisma/client';
	import feedbackStore from '$lib/store';
	import { tick } from 'svelte';
	import { fade } from 'svelte/transition';

	export let feedback: Feedback;

	let editing = false;
	let editedFeedbackText = feedback.text;

	function toggleEdit() {
		editing = !editing;
		editedFeedbackText = feedback.text;
	}

	async function onSave() {
		if (feedback.text === editedFeedbackText) {
			toggleEdit();
			return;
		}

		const data = JSON.stringify({
			...feedback,
			text: editedFeedbackText
		});

		$feedbackStore.editFeedback(feedback.id, data);

		toggleEdit();
	}

	function confirmDelete(message: string) {
		return window.confirm(message);
	}

	const onDelete = async () => {
		const confirmed = confirmDelete('Do you really want to delete this item?');

		if (confirmed) {
			$feedbackStore.deleteFeedback(feedback.id);
		}
	};

	let inputElement: HTMLInputElement | null = null;

	$: if (editing) {
		(async () => {
			await tick();
			inputElement?.focus();
		})();
	}
</script>

<div transition:fade class="bg-white text-gray-700 rounded-lg p-8 my-5 relative">
	<div
		class="bg-pink-500 text-white rounded-full border-2 border-gray-200 w-12 h-12 flex items-center justify-center text-2xl font-bold absolute top-0 left-0 -mt-4 -ml-4"
	>
		{feedback.rating}
	</div>
	<button
		type="button"
		class="absolute text-gray-900 font-semibold top-2 right-4"
		on:click={onDelete}
	>
		X
	</button>
	<button
		class="absolute top-2 right-12 text-pink-500 hover:text-pink-700"
		class:hidden={editing}
		on:click={toggleEdit}>Edit</button
	>
	{#if editing}
		<div class="flex justify-between gap-4">
			<input
				type="text"
				class="border rounded-lg p-2 w-full focus:outline-none"
				bind:value={editedFeedbackText}
				bind:this={inputElement}
			/>
			<div class="flex gap-2">
				<button class="text-pink-500 hover:text-pink-700" on:click={onSave}>Save</button>
				<button class="hover:text-pink-700" on:click={toggleEdit}>Cancel</button>
			</div>
		</div>
	{:else}
		<p>{feedback.text}</p>
	{/if}
</div>
