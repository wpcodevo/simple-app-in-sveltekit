<script lang="ts">
	import feedbackStore from '$lib/store';
	import Rating from './rating.svelte';

	let message: string | null = null;
	let rating = 10;
	let feedbackText: string = '';
	const MIN_TEXT_LENGTH = 10;

	async function onSubmit(event: Event) {
		event.preventDefault();

		if (feedbackText.trim().length < MIN_TEXT_LENGTH) {
			message = `feedback text must be at least ${MIN_TEXT_LENGTH} characters`;
			return;
		}

		const feedbackData = JSON.stringify({
			text: feedbackText,
			rating
		});

		$feedbackStore.addFeedback(feedbackData);
		feedbackText = '';
		rating = 10;
	}

	$: isDisabled = feedbackText.trim().length === 0;
	$: {
		if (feedbackText.trim().length > 10) {
			message = null;
		}
	}
</script>

<div class="bg-white text-gray-700 rounded-lg p-8 my-5 relative">
	<form on:submit={onSubmit}>
		<div class="max-w-md mx-auto">
			<label for="feedback-input" class="inline-block text-center text-2xl font-bold"
				>How would you rate your service with us?</label
			>
		</div>
		<Rating selected={rating} onchange={(val) => (rating = val)} />
		<div class="flex border rounded-lg my-4 px-2 py-3">
			<input
				type="text"
				id="feedback-input"
				bind:value={feedbackText}
				class="flex-grow border-none text-lg focus:outline-none"
				placeholder="Tell us something that keeps you coming back"
			/>
			<button
				type="submit"
				disabled={isDisabled}
				class="border-0 rounded-md w-28 h-10 cursor-pointer bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-gray-400 disabled:text-gray-800 disabled:cursor-not-allowed"
			>
				Send
			</button>
		</div>
		{#if message}
			<div class="pt-3 text-center text-purple-600">{message}</div>
		{/if}
	</form>
</div>
