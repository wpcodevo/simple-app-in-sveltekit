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

<div class="bg-white text-gray-700 rounded-lg p-2 my-2 sm:p-8 sm:my-5 relative">
	<form on:submit={onSubmit}>
		<div class="max-w-md mx-auto">
			<label for="feedback-input" class="inline-block text-center text-2xl font-bold"
				>How would you rate your service with us?</label
			>
		</div>
		<Rating selected={rating} onchange={(val) => (rating = val)} />
		<div
			class="flex flex-col items-center gap-y-4 sm:gap-y-0 sm:flex-row sm:border rounded-lg sm:my-4 px-2 py-3"
		>
			<input
				type="text"
				id="feedback-input"
				bind:value={feedbackText}
				class="sm:flex-grow border w-full rounded sm:rounded-none px-2 py-3 sm:border-none text-base sm:text-lg focus:outline-none"
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
			<div class="sm:pt-3 text-center text-purple-600">{message}</div>
		{/if}
	</form>
</div>
