<script lang="ts">
	import feedbackStore from '$lib/store';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import FeedbackForm from '../components/feedback-form.svelte';
	import FeedbackStats from '../components/feedback-stats.svelte';
	import FeedbackItem from '../components/feedback-item.svelte';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';

	export let data: PageData;
	$: ({ feedbacks } = data);
	let pageLoading = false;

	async function onFocus() {
		$feedbackStore.setPageLoading(true);
		await invalidate('/api/feedbacks');
		$feedbackStore.setPageLoading(false);
	}

	onMount(() => {
		window.addEventListener('focus', onFocus);

		return () => {
			window.removeEventListener('focus', onFocus);
		};
	});

	$: pageLoading = $feedbackStore.page_loading;
</script>

<main class="md:container mt-10 sm:mt-24 px-5">
	<FeedbackForm />
	<FeedbackStats {feedbacks} />

	{#each feedbacks as feedback}
		<FeedbackItem {feedback} />
	{/each}

	{#if feedbacks.length === 0}
		<p
			in:fade={{ delay: 700, duration: 300 }}
			class="max-w-md mx-auto py-6 text-center text-lg rounded-md bg-white"
		>
			No Feedbacks Found
		</p>
	{/if}
</main>
{#if pageLoading}
	<div
		class="fixed top-2 left-2 sm:top-5 sm:left-5 inline-block h-4 w-4 sm:h-8 sm:w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
		role="status"
	/>
{/if}
